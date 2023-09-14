"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { inter } from "@/app/fonts";
import { generatePassword } from "@/utils/generatePassword";

const createPassword = (generatedPassword: string, keyword: string) => {
  const retrievedPasswords = localStorage.getItem("passwords");
  const passwords: string[] = retrievedPasswords
    ? JSON.parse(retrievedPasswords)
    : [];

  passwords.push(keyword);

  localStorage.setItem("passwords", JSON.stringify(passwords));
};

function Modal({ setOpenModal }: { setOpenModal: (arg0: boolean) => void }) {
  const [generatedPassword, setGeneratedPassword] = useState("...");
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if (e.target.value) {
      setGeneratedPassword(
        generatePassword("ahlaulhe@gmail.com", "test", e.target.value)
      );
    } else {
      setGeneratedPassword("...");
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
    setGeneratedPassword(
      generatePassword("ahlaulhe@gmail.com", "test", keyword)
    );
  };

  const handleSubmit = () => {
    createPassword(generatedPassword, keyword);
    setKeyword("");
    setGeneratedPassword("...");
    setOpenModal(false);
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.7, ease: "anticipate" }}
      className={`${inter.className} w-full fixed flex justify-center items-center`}
    >
      <div className="w-[500px] h-[450px] bg-foreground rounded-[12px] shadow-lg flex flex-col justify-between p-3">
        <div className="flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-700 duration-200 px-4 py-2 rounded-full border-none text-base font-bold cursor-pointer"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
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
  );
}

export default Modal;
