import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MotionWrapper from "@/components/MotionWrapper";
import AuthProvider from "@/components/AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

export const metadata: Metadata = {
  title: "TimeWise",
  description: "Password/Task Manager",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="bg-main text-white">
        <Navbar />
        <MotionWrapper>
          <AuthProvider session={session}>{children}</AuthProvider>
        </MotionWrapper>
      </body>
    </html>
  );
}
