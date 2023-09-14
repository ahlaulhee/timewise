"use client";
import Link from "next/link";
import { quicksand, ubuntu, worksans } from "@/app/fonts";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="flex flex-row text-custom-white py-12">
      {/* LEFT SIDE */}
      <div className="p-4 flex flex-col justify-evenly w-1/2">
        <h1
          className={`${worksans.className} text-3xl font-bold tracking-wide`}
        >
          TimeWise
        </h1>
        <h2 className={`${quicksand.className} text-4xl`}>
          Unlock Peace of Mind: Secure Passwords, Organized Tasks!
        </h2>
        <div className="w-full flex justify-center">
          <motion.button
            transition={{ type: "tween" }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="w-1/2 flex justify-center"
          >
            <Link
              href="/api/auth/signin"
              className={`${ubuntu.className} border rounded-lg border-white w-full py-4 tracking-wide hover:bg-white hover:text-black duration-200`}
            >
              TRY IT NOW!
            </Link>
          </motion.button>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="w-1/2 flex justify-center items-center">
        <img
          className="h-[29rem] w-[27rem]"
          src="https://lesolson.com/wp-content/uploads/2019/08/Asset-1strong-password.png"
          alt="Hero Section Image"
        />
      </div>
    </section>
  );
}
