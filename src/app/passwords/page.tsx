"use client";

import Modal from "@/components/Modal";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ubuntu } from "../fonts";

export default function Passwords() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <div
        className={`${ubuntu.className} max-w-screen-xl mx-auto flex justify-between items-center`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="rounded-lg pl-4 pr-12 py-3 text-black"
        />
        <p className="text-3xl">Someone&apos;s passwords</p>
        <button
          className="py-3 px-20 border-2 rounded-lg bg-foreground text-white cursor-pointer"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          ADD PASSWORD
        </button>
      </div>
      <AnimatePresence>
        {modalOpen && <Modal setOpenModal={setModalOpen} />}
      </AnimatePresence>
      <div className="max-w-screen-xl mx-auto h-screen rounded-lg bg-foreground mt-3"></div>
    </div>
  );
}
