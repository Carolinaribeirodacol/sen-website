import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        identifier: { label: "Identifier", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:1337/api/auth/local", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: credentials?.identifier,
            password: credentials?.password,
          }),
        })

        const response = await res.json()

        if (response) {
          return response
        } else {
          return null
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  debug: true,
  callbacks: {
    async session({ session, token, user }) {
      // session: async (session, user) => {
      session.user = token as any;
      // session.jwt = session.user.jwt
      // session.user = session.user.user

      // return Promise.resolve(session)
      return session

    },
    async jwt({ token, user }: any) {
      token.jwt = user.jwt

      return token
    }
  },
  pages: {
    signIn: "/signin"
  },
}