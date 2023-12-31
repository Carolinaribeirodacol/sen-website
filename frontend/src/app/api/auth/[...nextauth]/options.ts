import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "./auth";
import { getStrapiURL } from '@/helpers/api';

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        /**
         * This function is used to define if the user is authenticated or not.
         * If authenticated, the function should return an object contains the user data.
         * If not, the function should return `null`.
         */
        if (credentials == null) return null;
        /**
         * credentials is defined in the config above.
         * We can expect it contains two properties: `email` and `password`
         */
        try {
          const { user, jwt } = await signIn({
            email: credentials.email,
            password: credentials.password,
          });

          const me = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me?populate=image`, {
            headers: {
              Authorization: `Bearer ${jwt}`,
              'Content-Type': 'application/json',
            }
          });

          const meData = await me.json();

          const userWithImage = {
            ...user,
            image: meData.image ? getStrapiURL(meData.image.formats.thumbnail.url) : null
          }

          return { ...userWithImage, jwt };
        } catch (error) {
          // Sign In Fail
          console.log(error)
          return null;
        }
      },
    }),
  ],

  // Custom signin page
  pages: {
    signIn: "/signin",
  },

  // Integrate to Strapi
  session: {
    strategy: "jwt",
    maxAge: 86400, // 24 Hours
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token as any;

      return Promise.resolve(session);
    },

    async jwt({ token, user, account }) {
      const isSignIn = user ? true : false;

      if (account?.provider === "credentials") {
        // Handle CredentialsProvider-specific logic here
        if (isSignIn) {
          token.id = user.id;
        }
      } else if (account?.provider === "google") {
        // Handle GoogleProvider-specific logic here
        if (isSignIn && account) {
          try {
            console.log("SSO Provider -> Strapi ", account);
            const public_url = process.env.BACKEND_API_DOMAIN;
            const response = await fetch(
              `https://${public_url}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`
            );
            const data = await response.json();
            console.log("Strapi Callback Data", data);
            token.jwt = data.jwt;
            token.id = data.user.id;
          } catch (error) {
            console.error("Fetch failed:", error);
          }
        }
      }
      return Promise.resolve(token);
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};