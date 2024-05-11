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
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import moment from "moment";

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

          // what if the above request throws errors like 401?! (this one was not handled now)

          const user = jwtDecode(data.access_token) as User;

          // console.log("workspace: ", data?.workspace);

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return {
              id: user.sub,
              name: user.username,
              email: user.email,
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              accessTokenExpires: user.exp,
              workspace: data?.workspace || {}
            };
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (e) {
          if (isAxiosError(e)) {
            console.error(e?.response?.data);
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

          // console.log("workspace: ", data?.workspace);

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return {
              id: user.sub,
              name: user.username,
              email: user.email,
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              accessTokenExpires: user.exp,
              workspace: data?.workspace || {}
            };
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (e) {
          if (isAxiosError(e)) {
            console.error(e?.response?.data);
            throw new Error(e?.response?.data.detail);
          }
          throw new Error("Failed to sign up user");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // console.log('JWT callback triggered with:', { token, user, account, trigger, session });
  
      if(trigger === "update" && session.user.workspace) {
        // console.log('Updating session...');
        token.workspace = session.user.workspace;
        return token;
      }
  
      if (user && account) {
        // Initial sign in
        if (account.type === "credentials") {
          // console.log('Credentials login detected...');
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
          token.workspace = user.workspace;
          token.accessTokenExpires = user.accessTokenExpires;
          // console.log('Returning token:', token);
          return token;
        } else {
          // OAuth
          // console.log('OAuth login detected...');
          if (user) {
            try {
              // console.log('Fetching tokens with API...');
              const { data } = await oAuthLoginApi({
                email: user.email!,
                name: user.name!,
                user_id: user.id,
                picture: user.image || "",
              });
              token.accessToken = data.access_token;
              token.refreshToken = data.refresh_token;
              token.workspace = user.workspace;
              token.accessTokenExpires = user.accessTokenExpires;              
              // console.log('Returning token:', token);
              return token;
            } catch (e) {
              console.error('Error fetching tokens with API:', e);
            }
          }
        }
      }
  
      console.log("Date.now(): ", moment().unix());
      console.log("token.accessTokenExpires: ", token.accessTokenExpires);
      if (moment().unix() < token.accessTokenExpires) {
        console.log('Access token has not expired yet, returning it...');
        return token;
      }
  
      // if (!token.refreshToken) {
      //   console.error('Missing refresh token');
      //   throw new Error("Missing refresh token");
      // }
  
      console.log("Access token has expired, trying to refresh it");
      // console.log(token);
      return refreshAccessToken(token);
    },
  
    async session({ session, token}) {
      console.log('Session callback triggered with:', { session, token });
      session.error = token.error;
      const { picture, ...rest } = token;
      session.user = {
        ...(rest as any),
        image: picture,
      };
      console.log('Returning session:', session);
      return session;
    },
  }  
} satisfies NextAuthOptions;

export async function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return await getServerSession(...args, authConfig);
}