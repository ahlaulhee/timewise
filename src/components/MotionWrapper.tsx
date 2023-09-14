"use client";
import { AnimatePresence, motion } from "framer-motion";

export default function MotionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -300, opacity: 0 }}
          transition={{ duration: 0.7, ease: "anticipate" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
