"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { inter, worksans } from "../fonts";
import { useSession } from "next-auth/react";
import { generatePassword } from "@/utils/generatePassword";
import PasswordModal from "@/components/PasswordModal";

const PasswordItem = ({
  keyword,
  genPassword,
  handleCopy,
  handleDelete,
}: {
  keyword: string;
  genPassword: string | undefined;
  handleCopy: (genPassword: string) => void;
  handleDelete: (keyword: string) => void;
}) => {
  // TODO: Add copy counter
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.8 }}
      exit={{ opacity: 0 }}
      viewport={{ once: true }}
      className={`${worksans.className} flex justify-evenly m-4 p-4 bg-main rounded-lg`}
    >
      <p className="w-1/3 font-bold">{keyword}</p>
      <p className="w-1/3 flex justify-center">{genPassword}</p>
      <div className="w-1/3 space-x-4 flex justify-end">
        <button
          className="hover:underline active:text-custom-cyan duration-100"
          onClick={() => handleCopy(genPassword ? genPassword : "")}
        >
          Copy
        </button>
        <button
          className="hover:underline active:text-custom-red duration-100"
          onClick={() => handleDelete(keyword)}
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default function Passwords() {
  const [modalOpen, setModalOpen] = useState(false);
  const [keywords, setKeywords] = useState<
    { userId: string; keyword: string }[]
  >([]);
  const {
    data: session,
    status,
  }: {
    data: any;
    status: "loading" | "authenticated" | "unauthenticated";
  } = useSession();

  useEffect(() => {
    const retrievedKeywords = localStorage.getItem("keywords");
    const keywords: { userId: string; keyword: string }[] = retrievedKeywords
      ? JSON.parse(retrievedKeywords)
      : [];
    const userKeywords = keywords.filter(
      (keyword) => keyword.userId === session?.user?.id
    );
    setKeywords(userKeywords);
  }, [session?.user?.id, modalOpen]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const retrievedKeywords = localStorage.getItem("keywords");
    const keywords: { userId: string; keyword: string }[] = retrievedKeywords
      ? JSON.parse(retrievedKeywords)
      : [];
    const userKeywords = keywords.filter((keyword) =>
      keyword.keyword.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setKeywords(userKeywords);
  };

  const handleCopy = (pass: string) => {
    navigator.clipboard.writeText(pass);
    // TODO: add notification
  };

  const handleDelete = (keyw: string) => {
    const retrievedKeywords = localStorage.getItem("keywords");
    const keywords: { userId: string; keyword: string }[] = retrievedKeywords
      ? JSON.parse(retrievedKeywords)
      : [];
    const userKeywords = keywords.filter((keyword) => keyword.keyword !== keyw);
    localStorage.setItem("keywords", JSON.stringify(userKeywords));
    setKeywords(userKeywords);
    // TODO: add notification
  };

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
          onChange={handleSearch}
          className="rounded-lg pl-4 pr-12 py-3 text-black"
        />
        <p className="hidden md:block text-center text-3xl">
          {session?.user?.name}&apos;s passwords
        </p>
        <motion.button
          initial={{ scale: 1, opacity: 1 }}
          whileTap={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 0.01 }}
          className="py-3 px-20 border-2 rounded-lg bg-foreground hover:bg-main duration-200 text-white cursor-pointer"
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
          {keywords.map((e) => (
            <PasswordItem
              key={e.keyword}
              keyword={e.keyword}
              handleCopy={handleCopy}
              handleDelete={handleDelete}
              genPassword={generatePassword(
                session?.user?.name,
                session?.user?.password,
                e.keyword
              )}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
