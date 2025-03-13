// import  { rateLimit } from "@/lib/redis";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/logout',
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
      async authorize(credentials , req) {
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
            username : true,
            role : true,
            password : true
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
    // async signIn({ account, profile }) {
    //   if (account?.provider === 'google' && profile?.email) {
    //     try {

    //       await prisma.user.upsert({
    //         where: { email: profile.email },
    //         create: {
    //           email: profile.email,
    //           username: profile.name ,
    //           role: 'USER', // Default role for new users
    //           gender: null, // Default to null, or modify based on your logic
    //         },
    //         update: {
    //           username: profile.name || 'Anonymous',
    //         },
    //       });
    //     } catch (error) {
    //       console.error('Error during signIn callback:', error);
    //       return false; // Deny the sign-in
    //     }
    //   }
    //   return true; 
    // },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.role = (user as any).role;
      }
      console.log(token);
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        username: token.username,
        role : token.role as string,
      };
      console.log(session);
      return session;
    },
  },
};