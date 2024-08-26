import NextAuth from "next-auth/next";
import { authOptions } from "@/app/lib/auth"; // or "@/lib/auth" depending on where you placed it

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };