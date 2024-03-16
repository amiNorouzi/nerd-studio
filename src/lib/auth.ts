import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

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
        console.log("login", { credentials });
        // Add logic here to look up the user from the credentials supplied
        //TODO: Implement API logic here
        //data from login
        const user = {
          id: "1",
          name: "name",
          email: "email",
        };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    CredentialsProvider({
      // The name to display on the signin form (e.g. "Sign in with...")
      name: "credentials",
      id: "signup-credentials",
      credentials: {
        email: {},
        password: {},
        fullName: {},
      },
      async authorize(credentials) {
        console.log("signup", { credentials });
        // Add logic here to look up the user from the credentials supplied
        //TODO: Implement API logic here
        //data from signup
        const user = {
          id: "1",
          name: "name",
          email: "email",
        };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
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
      console.log("data in jwt callback: ", { user, token, account });
      if (account) {
        // call the signToken function which returns a JWT token
        //TODO: get jwt tokens
        // const token = await SignToken(user?.email as string);
        // token.userToken = token;
        token.accessToken = "accessToken";
        token.refreshToken = "refreshToken";
        token.exp = 1712997999;
      }
      // the token object is passed done to the session call back for persistence
      return token;
    },

    async session({ session, token }) {
      console.log("data in session: ", { session, token });
      // console.log({tokenInSession: token})
      const { picture, ...rest } = token;
      session.user = {
        ...(rest as any),
        image: picture,
      };
      return session;
    },
  },
} satisfies NextAuthOptions;
