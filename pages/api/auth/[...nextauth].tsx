// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined,
        req: any
      ) {
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a user object, or null if the credentials
        // are invalid.
        // You can do this by calling an external API endpoint or a database query.

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user);
        } else {
          // If you return null or false then the credentials will be rejected
          return Promise.resolve(null);
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
        }
      },
    }),
  ],
  callbacks: {
    async jwt(params: { token: any; user: any }) {
      const { token, user } = params;
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session(params: {
      session: any;
      token: any;
      user: any;
      newSession: any;
      trigger: any;
    }) {
      const { session, token } = params;
      session.userId = token.id;
      session.name = token.name;
      return session;
    },
  },
});
