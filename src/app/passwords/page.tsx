"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { inter } from "../fonts";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { generatePassword } from "@/utils/generatePassword";
import PasswordModal from "@/components/PasswordModal";
import PasswordItem from "@/components/PasswordItem";

import useKeywordManagement from "@/hooks/useKeywords";

export default function Passwords() {
  const {
    data: session,
    status,
  }: {
    data: any;
    status: "loading" | "authenticated" | "unauthenticated";
  } = useSession();

  const {
    searchInput,
    keywords,
    handleSearch,
    handleCopy,
    handleDelete,
    modalOpen,
    setModalOpen,
  } = useKeywordManagement(session);

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
      // viewport={{ once: true }}
    >
      <div
        className={`${inter.className} max-w-screen-xl mx-auto flex justify-between items-center`}
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearch}
          className="rounded-lg pl-4 py-3 text-black w-full md:w-1/4"
        />
        {session ? (
          <div className="text-center w-2/4 flex justify-center flex-col items-center">
            <button
              className="text-crimson border rounded px-2"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
            <p className="hidden md:block text-center text-2xl">
              {session?.user?.name}&apos;s passwords
            </p>
          </div>
        ) : null}
        <motion.button
          initial={{ scale: 1, opacity: 1 }}
          whileTap={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 0.01 }}
          className="py-3 border-2 rounded-lg bg-white-smoke hover:bg-main duration-200 text-main hover:text-white cursor-pointer w-full md:w-1/4"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          ADD PASSWORD
        </motion.button>
      </div>
      <AnimatePresence>
        {modalOpen && <PasswordModal setOpenModal={setModalOpen} />}
      </AnimatePresence>
      <div className="max-w-screen-xl mx-auto h-fit rounded-lg bg-foreground m-3 py-1">
        <AnimatePresence>
          {keywords
            .sort((a, b) => b.timesCopied - a.timesCopied)
            .map((e) => (
              <PasswordItem
                key={e.keyword}
                keyword={e.keyword}
                timesCopied={e.timesCopied}
                type={e.type}
                handleCopy={handleCopy}
                handleDelete={handleDelete}
                genPassword={generatePassword(
                  session?.user?.name,
                  session?.user?.password,
                  e.keyword,
                  e.type
                )}
              />
            ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
