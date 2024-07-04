// pages/api/auth/[...nextauth].tsx
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const formatUsername = (username: string) => {
  if (username.startsWith("mk.")) {
    return username.substring(3);
  }

  return username;
};

const fetchUser = async (username: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PORTAL_API_URL}/api/User/${username}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  console.log(username);
  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    email: data.email,
  };
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error("Credentials are not provided");
          return Promise.resolve(null);
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_PORTAL_API_URL}/api/User/ADAuth?userName=${credentials.username}&password=${credentials.password}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!res.ok) {
            throw new Error("Network response was not ok");
          }

          const isTrue = await res.json(); // or res.text() if the response is plain text

          const usernameFormatted = formatUsername(credentials.username);

          const user = await fetchUser(usernameFormatted);

          if (isTrue && user) {
            // Any object returned will be saved in `user` property of the JWT
            return Promise.resolve(user);
          } else {
            // If you return null or false then the credentials will be rejected
            return Promise.resolve(null);
          }
        } catch (error) {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
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
