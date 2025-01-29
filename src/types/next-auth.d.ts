
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    username: string;
    email: string;
    role : string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      email: string;
      role : string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    email: string;
    role : string;
  }
}