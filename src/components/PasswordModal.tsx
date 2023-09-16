"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { inter } from "@/app/fonts";
import { generatePassword } from "@/utils/generatePassword";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface UserData {
  expires: Date;
  user: {
    id?: string | null;
    name?: string | null;
    password?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const createPassword = (userId: string, keyword: string) => {
  // TODO: Add validations
  // TODO: Add password types (long, short, pin, etc)
  // TODO: Add notifications
  const retrievedKeywords = localStorage.getItem("keywords");
  const keywords: { userId: string; keyword: string; timesCopied: number }[] =
    retrievedKeywords ? JSON.parse(retrievedKeywords) : [];

  keywords.push({ userId: userId, keyword: keyword, timesCopied: 0 });

  localStorage.setItem("keywords", JSON.stringify(keywords));
};

function PasswordModal({
  setOpenModal,
}: {
  setOpenModal: (arg0: boolean) => void;
}) {
  const {
    data: session,
    status,
  }: { data: any; status: "loading" | "authenticated" | "unauthenticated" } =
    useSession();

  const [generatedPassword, setGeneratedPassword] = useState("...");
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if (
      e.target.value &&
      session &&
      session?.user?.name &&
      session?.user?.password
    ) {
      const genPass = generatePassword(
        session?.user?.name,
        session?.user?.password,
        e.target.value
      );
      if (genPass) {
        setGeneratedPassword(genPass);
      }
    } else {
      setGeneratedPassword("...");
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
    if (session && keyword) {
      const genPass = generatePassword(
        session?.user?.name,
        session?.user?.password,
        e.target.value
      );
      if (genPass) {
        setGeneratedPassword(genPass);
      }
    } else {
      setGeneratedPassword("...");
    }
  };

  const handleSubmit = () => {
    createPassword(session?.user?.id, keyword);
    setKeyword("");
    setGeneratedPassword("...");
    setOpenModal(false);
  };

  return (
    <div className="w-full flex justify-center">
      <motion.div
        drag
        dragConstraints={{
          top: -window.innerHeight / 2 + 400,
          left: -window.innerWidth / 2 + 500,
          right: window.innerWidth / 2 - 500,
          bottom: window.innerHeight / 2 - 150,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.7, ease: "anticipate" }}
        className={`${inter.className} w-fit fixed`}
      >
        <div className="w-[500px] h-[450px] bg-[#171a26] rounded-[12px] shadow-lg flex flex-col justify-between p-3">
          <div className="flex justify-between items-center">
            <div className="w-1/3"></div>
            <p className="text-2xl font-bold w-full text-center">
              Add Password
            </p>
            <div className="w-1/3 flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-700 duration-200 px-4 py-2 rounded-full border-none text-base font-bold cursor-pointer"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                X
              </button>
            </div>
          </div>
          <div className="text-center flex flex-col justify-center items-center">
            {/* <h1 className="text-2xl">Create a new Password!</h1> */}
            <p className="bg-main py-2 px-8 w-fit border-2 rounded-full text-xl shadow-lg">
              {generatedPassword}
            </p>
          </div>
          <input
            type="text"
            placeholder="Keyword..."
            maxLength={20}
            value={keyword}
            onChange={handleChange}
            className="w-full rounded bg-main p-3 tracking-widest"
          />
          <select
            name=""
            id=""
            onChange={handleSelectChange}
            className="w-full rounded bg-main p-4 tracking-widest"
          >
            <option value="long">Long</option>
            <option value="verylong">Very Long</option>
            <option value="short">Short</option>
            <option value="pin">PIN</option>
          </select>
          <div className="flex-1/5 flex justify-center items-center space-x-4">
            <button
              className="w-full p-2 border-2 border-red-500 bg-red-700 text-white hover:bg-red-500 hover:text-black hover:tracking-wide duration-200 rounded-[8px] text-[20px] cursor-pointer"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="w-full p-2 border-2 border-green-500 bg-green-700 text-white hover:bg-green-500 hover:text-black hover:tracking-wide duration-200 rounded-[8px] text-[20px] cursor-pointer"
            >
              Create
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default PasswordModal;
