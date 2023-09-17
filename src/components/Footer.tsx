"use client";
import Link from "next/link";
import Image from "next/image";
import { worksans } from "@/app/fonts";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaCircleChevronUp } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer
      className={`${worksans.className} text-main bg-foreground rounded-t-lg px-4 py-12 flex flex-col justify-center items-center text-center space-y-6`}
    >
      <motion.button
        whileHover={{ scale: 1.4 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <FaCircleChevronUp className="w-10 h-10" />
      </motion.button>
      <h2 className={`text-3xl`}>
        This project was made possible by{" "}
        <span className="font-bold text-crimson uppercase tracking-wide">
          ahlaulhe
        </span>
      </h2>
      <h3 className={`text-2xl`}>YOU CAN FIND ME ON:</h3>
      <div className="flex justify-center space-x-12">
        <Link href="https://www.linkedin.com/in/alex-laulhe/">
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="rounded-full border-4 border-main p-6"
          >
            <FaLinkedinIn className="h-16 w-16" />
          </motion.div>
          {/* <motion.img
            className="h-32"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            src="/github.png"
            alt="LOGO GITHUB"
          /> */}
        </Link>
        <Link href="https://github.com/ahlaulhee">
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="rounded-full border-4 border-main p-6"
          >
            <FaGithub className="h-16 w-16" />
          </motion.div>
          {/* <motion.img
            className="h-32"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            src="/linkedin.png"
            alt="LOGO LINKEDIN"
          /> */}
        </Link>
      </div>
      <p className={`text-sm`}>© 2023 AHLAULHE. All rights reserved.</p>
    </footer>
  );
}
