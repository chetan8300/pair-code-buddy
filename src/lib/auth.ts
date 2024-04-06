import { DrizzleAdapter } from "@auth/drizzle-adapter"
import GoogleProvider from "next-auth/providers/google"
import type { Adapter } from "next-auth/adapters"
import { db } from "@/db"
import { NextAuthOptions, getServerSession } from "next-auth";

export const authConfig: NextAuthOptions = {
  // session: {
  //   strategy: "jwt",
  // },
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // async jwt({ token, user }) {
    //   const dbUser = await db.query.users.findFirst({
    //     where: (users, { eq }) => eq(users.email, token.email!)
    //   });

    //   if (!dbUser) {
    //     throw new Error("User not found");
    //   }

    //   token.sub = dbUser.id;

    //   return token;
    // },
    async session({ session, token, user }) {
      if (user && session?.user) {
        session.user.id = user.id;
      }

      return session;
    }
  }
}

export function getSession() {
  return getServerSession(authConfig);
}