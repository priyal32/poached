// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { User } from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role: string;
    sessionToken: string;
    username: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      role: string;
      sessionToken: string;
      username: string;
    };
  }

  // override user
  interface User {
    username?: string | null;
    email?: string | null;
    role?: string | null;
    id: UserId;
    token?: string;
  }
}
