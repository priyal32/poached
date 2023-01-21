import { authOptions } from "@libs/server/auth";
import NextAuth from "next-auth/next";

export default NextAuth(authOptions);
