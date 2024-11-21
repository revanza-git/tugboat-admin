// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    userId: string;
    name: string;
  }

  interface JWT {
    id: string;
    name: string;
  }
}
