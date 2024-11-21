import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const formatUsername = (username: string) => {
  return username.startsWith("mk.") ? username.substring(3) : username;
};

const fetchUser = async (
  username: string
): Promise<{ id: string; name: string; email: string }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PORTAL_API_URL}/api/User/${username}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: any = await response.json();

  if (
    typeof data.id === "string" &&
    typeof data.name === "string" &&
    typeof data.email === "string"
  ) {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
    };
  } else {
    throw new Error("Invalid response format");
  }
};

const authenticateUser = async (credentials: {
  username: string;
  password: string;
}) => {
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

  return res.json(); // or res.text() if the response is plain text
};

type RequestInternal = {
  body?: Record<string, any>;
  query?: Record<string, any>; // Make query optional
  headers?: HeadersInit;
  method?: string;
};

const authorizeUser = async (
  credentials: { username: string; password: string } | undefined,
  req: Pick<RequestInternal, "body" | "headers" | "method" | "query">
): Promise<{ id: any; name: any; email: any } | null> => {
  if (!credentials) {
    return null;
  }

  // Check for hardcoded credentials
  if (credentials.username === "admin" && credentials.password === "admin123") {
    return {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
    };
  }

  try {
    const isAuthenticated = await authenticateUser(credentials);
    const usernameFormatted = formatUsername(credentials.username);
    const user = await fetchUser(usernameFormatted);

    return isAuthenticated && user ? user : null;
  } catch (error) {
    return null;
  }
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: authorizeUser,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      session.userId = (token.id as string) ?? ""; // Ensure token.id is a string
      session.name = (token.name as string) ?? ""; // Ensure token.name is a string
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
  },
});
