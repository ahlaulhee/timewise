"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { inter, worksans } from "../fonts";
import { signOut, useSession } from "next-auth/react";
import { generatePassword } from "@/utils/generatePassword";
import PasswordModal from "@/components/PasswordModal";
import { useRouter } from "next/navigation";
import PasswordItem from "@/components/PasswordItem";

import { Toast } from "@/utils/Toast";
import { type Keyword } from "@/utils/types";

export default function Passwords() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const {
    data: session,
    status,
  }: {
    data: any;
    status: "loading" | "authenticated" | "unauthenticated";
  } = useSession();

  const router = useRouter();

  const getKeywords = () => {
    const retrievedKeywords = localStorage.getItem("keywords");
    return retrievedKeywords ? JSON.parse(retrievedKeywords) : [];
  };

  useEffect(() => {
    const keywords: Keyword[] = getKeywords();
    const userKeywords = keywords.filter(
      (keyword) => keyword.userId === session?.user?.id
    );
    setKeywords(userKeywords);
  }, [session?.user?.id, modalOpen]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    const keywords: Keyword[] = getKeywords();
    const userKeywords = keywords.filter(
      (keyword) =>
        keyword.keyword.toLowerCase().includes(e.target.value.toLowerCase()) &&
        keyword.userId === session?.user?.id
    );
    setKeywords(userKeywords);
  };

  const handleCopy = (keyw: string, pass: string) => {
    navigator.clipboard.writeText(pass);
    const keywords: Keyword[] = getKeywords();
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
    Toast.fire({
      icon: "info",
      title: `The password for ${keyw} has been copied.`,
    });
  };

  const handleDelete = (keyw: string, type: string) => {
    const keywords: Keyword[] = getKeywords();
    const updatedKeywords = keywords.filter(
      (keyword) =>
        // keyword.keyword !== keyw
        !(keyword.keyword === keyw && keyword.type === type)
      // && session?.user?.id === keyword.userId
    );
    localStorage.setItem("keywords", JSON.stringify(updatedKeywords));
    const userKeywords = updatedKeywords.filter(
      (keyword) =>
        keyword.keyword.toLowerCase().includes(searchInput.toLowerCase()) &&
        keyword.userId === session?.user?.id
    );
    setSearchInput("");
    setKeywords(userKeywords);
    Toast.fire({
      icon: "success",
      title: `The password for ${keyw} was deleted successfully.`,
    });
  };

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
