
  import { DefaultSession, DefaultUser } from "next-auth";

  declare module "next-auth" {
    interface User extends DefaultUser {
      id: string;
      name : string;
      username: string;
      email: string;
      role : string;
      pfpUrl? : string | null;
    }

    interface Session extends DefaultSession {
      user: {
        id: string;
        name : string;
        username: string;
        email: string;
        role : string;
        pfpUrl? : string | null;
      }
    }
  }

  declare module "next-auth/jwt" {
    interface JWT {
      id: string;
      name : string;
      username: string;
      email: string;
      role : string;
    }
  }