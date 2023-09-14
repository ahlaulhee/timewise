import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MotionWrapper from "@/components/MotionWrapper";

export const metadata: Metadata = {
  title: "TimeWise",
  description: "Password/Task Manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-main text-white">
        <Navbar />
        <MotionWrapper>{children}</MotionWrapper>
      </body>
    </html>
  );
}
