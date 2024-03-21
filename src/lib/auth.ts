import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import CredentialsProvider from "next-auth/providers/credentials";
import { loginApi, signupConfirmApi } from "@/services/authentication-services";
import { jwtDecode } from "jwt-decode";
import { isAxiosError } from "axios";
import { User } from "@/services/types";

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

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return {
              id: user.sub,
              name: user.username,
              email: user.email,
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
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
    async signIn({ account, profile }) {
      if (account?.provider.includes("credentials")) return true;
      console.log("data in signin callback: ", {
        account,
        profile,
      });
      // first axios request to ascertain if our user exists in our custom DB
      //TODO: check user exist with api
      // const response = await axios.post(
      //     "http://localhost:9000/v1/auth/userExists",
      //     { email: profile.email }
      // );

      // if (response && response.data?.value === true){
      const res = true;
      if (res) {
        // user exists return true passing control to the next callback
        return true;
      } else {
        // second axios call which creates a new user in our database
        //TODO: signup user with api

        // const data = {
        //   firstName: profile.given_name,
        //   lastName: profile.family_name,
        //   email: profile.email,
        //   profileUrl: profile.picture,
        // };
        // const response = await axios.post(
        //     "http://localhost:9000/v1/auth/signup",
        //     data
        // );
        // return true thereby passing control to the next callback
        return true;
      }
    },
    async jwt({ token, user, account }) {
      if (user && account) {
        if (account.type === "credentials") {
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
        } else {
          token.accessToken = account.accessToken;
          token.refreshToken = account.refreshToken;
        }
      }
      // the token object is passed done to the session call back for persistence
      return token;
    },

    async session({ session, token, user }) {
      const { picture, ...rest } = token;
      session.user = {
        ...(rest as any),
        image: picture,
      };
      return session;
    },
  },
} satisfies NextAuthOptions;
