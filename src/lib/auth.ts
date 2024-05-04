import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { jwtDecode } from "jwt-decode";
import { isAxiosError } from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

import {
  loginApi,
  oAuthLoginApi,
  signupConfirmApi,
} from "@/services/auth/authentication-services";

import type { User } from "@/services/types";
import { refreshAccessToken } from "./refreshAccessToken";

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      // The name to display on the signin form (e.g. "Sign in with...")
      name: "credentials",
      id: "login-credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) return null;
          const { data } = await loginApi({
            email: credentials.email,
            password: credentials.password,
          });
          const user = jwtDecode(data.access_token) as User;

          // console.log("data: ", data);

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return {
              id: user.sub,
              name: user.username,
              email: user.email,
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              workspace: data?.workspace || {}
            };
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (e) {
          if (isAxiosError(e)) {
            console.log(e?.response?.data);
            throw new Error(e?.response?.data.detail);
          }
          throw new Error("Failed to login user");
        }
      },
    }),
    CredentialsProvider({
      // The name to display on the signin form (e.g. "Sign in with...")
      name: "credentials",
      id: "signup-confirm-credentials",
      credentials: {
        email: {},
        token: {},
      },
      async authorize(credentials) {
        try {
          // Add logic here to look up the user from the credentials supplied
          if (!credentials?.email || !credentials.token) return null;
          const { data } = await signupConfirmApi({
            email: credentials.email,
            token: credentials.token,
          });
          //data from signup
          const user = jwtDecode(data.access_token) as User;

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return {
              id: user.sub,
              name: user.username,
              email: user.email,
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              workspace: data?.workspace || {}
            };
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (e) {
          if (isAxiosError(e)) {
            console.log(e?.response?.data);
            throw new Error(e?.response?.data.detail);
          }
          throw new Error("Failed to sign up user");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {      
      // update session
      if(trigger === "update" && session.user.workspace) {
        token.workspace = session.user.workspace;
      }

      // initial signup/signin
      if (user && account) {
        //get tokens from passed user in credentials login
        if (account.type === "credentials") {
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
          token.workspace = user.workspace;
          token.accessTokenExpires = Date.now() + token.exp;
          return token;
        } else {
          //in oAuth login fetch tokens with api
          if (user) {
            try {
              const { data } = await oAuthLoginApi({
                email: user.email!,
                name: user.name!,
                user_id: user.id,
                picture: user.image || "",
              });
              token.accessToken = data.access_token;
              token.refreshToken = data.refresh_token;
              token.workspace = user.workspace;
              token.accessTokenExpires = Date.now() + token.exp;
              return token;
            } catch (e) {
              console.error(e);
            }
          }
        }
      }

      if (Date.now() < token.accessTokenExpires) {
         // If the access token has not expired yet, return it
        return token;
      } else
        if (!token.refreshToken) throw new Error("Missing refresh token")
      

      console.log("Access token has expired, trying to refresh it");
      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },

    async session({ session, token}) {
      session.error = token.error;
      const { picture, ...rest } = token;
      session.user = {
        ...(rest as any),
        image: picture,
      };

      return session;
    },
  },
} satisfies NextAuthOptions;
