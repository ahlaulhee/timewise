"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { inter, worksans } from "../fonts";
import { signOut, useSession } from "next-auth/react";
import { generatePassword } from "@/utils/generatePassword";
import PasswordModal from "@/components/PasswordModal";
import { useRouter } from "next/navigation";

const PasswordItem = ({
  keyword,
  timesCopied,
  genPassword,
  handleCopy,
  handleDelete,
}: {
  keyword: string;
  timesCopied: number;
  genPassword: string | undefined;
  handleCopy: (keyword: string, genPassword: string) => void;
  handleDelete: (keyword: string) => void;
}) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.8 }}
      exit={{ opacity: 0 }}
      viewport={{ once: true }}
      className={`${worksans.className} flex justify-evenly m-4 p-4 bg-main rounded-lg`}
    >
      <p className="w-1/3 font-bold">
        {timesCopied} | {keyword}
      </p>
      <p className="w-1/3 flex justify-center">{genPassword}</p>
      <div className="w-1/3 space-x-4 flex justify-end">
        <button
          className="hover:underline active:text-custom-cyan duration-100"
          onClick={() => handleCopy(keyword, genPassword ? genPassword : "")}
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
  const [searchInput, setSearchInput] = useState("");
  const [keywords, setKeywords] = useState<
    { userId: string; keyword: string; timesCopied: number }[]
  >([]);
  const {
    data: session,
    status,
  }: {
    data: any;
    status: "loading" | "authenticated" | "unauthenticated";
  } = useSession();

  const router = useRouter();

  useEffect(() => {
    const retrievedKeywords = localStorage.getItem("keywords");
    const keywords: { userId: string; keyword: string; timesCopied: number }[] =
      retrievedKeywords ? JSON.parse(retrievedKeywords) : [];
    const userKeywords = keywords.filter(
      (keyword) => keyword.userId === session?.user?.id
    );
    setKeywords(userKeywords);
  }, [session?.user?.id, modalOpen]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    const retrievedKeywords = localStorage.getItem("keywords");
    const keywords: { userId: string; keyword: string; timesCopied: number }[] =
      retrievedKeywords ? JSON.parse(retrievedKeywords) : [];
    const userKeywords = keywords.filter(
      (keyword) =>
        keyword.keyword.toLowerCase().includes(e.target.value.toLowerCase()) &&
        keyword.userId === session?.user?.id
    );
    setKeywords(userKeywords);
  };

  const handleCopy = (keyw: string, pass: string) => {
    navigator.clipboard.writeText(pass);
    const retrievedKeywords = localStorage.getItem("keywords");
    const keywords: { userId: string; keyword: string; timesCopied: number }[] =
      retrievedKeywords ? JSON.parse(retrievedKeywords) : [];

    const matchedKeyword = keywords.find((kw) => kw.keyword === keyw);
    if (matchedKeyword) {
      matchedKeyword.timesCopied += 1;
    }
    const userKeywords = keywords.filter(
      (keyword) =>
        keyword.keyword.toLowerCase().includes(searchInput.toLowerCase()) &&
        keyword.userId === session?.user?.id
    );
    setKeywords(userKeywords);
    const modifiedKeywordsString = JSON.stringify(keywords);
    localStorage.setItem("keywords", modifiedKeywordsString);
    // TODO: add notification
  };

  const handleDelete = (keyw: string) => {
    const retrievedKeywords = localStorage.getItem("keywords");
    const keywords: { userId: string; keyword: string; timesCopied: number }[] =
      retrievedKeywords ? JSON.parse(retrievedKeywords) : [];
    const updatedKeywords = keywords.filter(
      (keyword) =>
        keyword.keyword !== keyw && session?.user?.id === keyword.userId
    );
    localStorage.setItem("keywords", JSON.stringify(updatedKeywords));
    const userKeywords = updatedKeywords.filter(
      (keyword) =>
        keyword.keyword.toLowerCase().includes(searchInput.toLowerCase()) &&
        keyword.userId === session?.user?.id
    );
    setSearchInput("");
    setKeywords(userKeywords);
    // TODO: add notification
  };

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session]);

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
          className="rounded-lg pl-4 pr-12 py-3 text-black"
        />
        {session ? (
          <div className="text-center">
            <button
              className="text-custom-red border rounded px-2"
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
          {keywords
            .sort((a, b) => b.timesCopied - a.timesCopied)
            .map((e) => (
              <PasswordItem
                key={e.keyword}
                keyword={e.keyword}
                timesCopied={e.timesCopied}
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
