import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
// import  { rateLimit } from "@/lib/redis";

// Define specific types for our callbacks
type JWTCallbackParams = {
  token: JWT;
  user: User | undefined;
};

type SessionCallbackParams = {
  session: Session;
  token: JWT;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge : 30 * 24 * 60 * 60 // 30 days
  
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ||"",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com',
        },
        password:
         { label: 'Password', type: 'password' },
      },
      async authorize(credentials  ) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Email and password are required');
        }
          
        // const ip = req?.headers?.["x-client"] || "unknown";
        // const key = `login_attempt_${ip}`;

        // // const isAllowed = await rateLimit(key, 5, 60);

        // if (!isAllowed) {
        //   throw new Error('Too many login attempts');
        // }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select : {
            id : true,
            email : true,
            name: true,
            username : true,
            role : true,
            password : true,
            pfpUrl : true,
          }
        });

        if (!user) {
          throw new Error('No user found with the provided email');
        }

        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Incorrect password');
        }
        
        console.log("User fetched in authorize :" , user)

        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google' && profile?.email) {
        try {
          
          const existingUser = await prisma.user.findUnique({
            where: { email: profile.email },
            select: { id: true, password: true, username: true }
          });
          console.log("Existing user in signIn callback:", existingUser);
    
          
          if (!existingUser) {
            return `/register/google?email=${encodeURIComponent(profile.email)}&name=${encodeURIComponent(profile.name || "")}&providerAccountId=${account.providerAccountId}`;
          }
          
          if (!existingUser.password || existingUser.password === "" || !existingUser.username) {
            return `/register/google?email=${encodeURIComponent(profile.email)}&name=${encodeURIComponent(profile.name || "")}&providerAccountId=${account.providerAccountId}`;
          }
          
          
          const linkedAccount = await prisma.account.findFirst({
            where: {
              userId: existingUser.id,
              provider: 'google',
              providerAccountId: account.providerAccountId
            }
          });
          
          if (!linkedAccount) {
          
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: 'oauth',
                provider: 'google',
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                refresh_token: account.refresh_token,
              }
            });
          }
          
          return true; 
        } catch (error) {
          console.error('Error during signIn callback:', error);
          return false; 
        }
      }
      return true;
    },
    async jwt({ token, user }: JWTCallbackParams) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
        token.pfpUrl = user.pfpUrl;
      }
      console.log("USER in JWT in auth.ts:", user);
      return token;
    },
    async session({ session, token }: SessionCallbackParams) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        username: token.username,
        role: token.role,
        pfpUrl: token.pfpUrl as string | null,
      };
      console.log("Session in auth.ts:", session);
      
      return session;
    },
  },
};