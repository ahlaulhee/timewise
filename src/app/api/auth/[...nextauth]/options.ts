// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto-js";

const prisma = new PrismaClient();
// const adapter = PrismaAdapter(prisma);

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Full Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const secretPassphrase = process.env.SECRET_PASSPHRASE;
        if (!secretPassphrase) {
          throw new Error("SECRET_PASSPHRASE is not defined");
        }
        if (!credentials || !credentials.name || !credentials.password) {
          throw new Error("Must provide Name and Master Password");
        }
        const user = await prisma.user.findUnique({
          where: { name: credentials.name },
        });
        if (!user) {
          const hashedPassword = crypto.AES.encrypt(
            credentials.password,
            secretPassphrase
          ).toString();
          const newUser = await prisma.user.create({
            data: {
              name: credentials.name,
              password: hashedPassword,
            },
          });
          return newUser;
        } else {
          const decryptedPassword = crypto.AES.decrypt(
            user.password,
            secretPassphrase
          ).toString(crypto.enc.Utf8);
          if (credentials.password === decryptedPassword) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  //   adapter,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.id = user.id;
        token.password = user.password; // Add the encrypted password to the JWT
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.password = token.password; // Add the encrypted password to the session
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
