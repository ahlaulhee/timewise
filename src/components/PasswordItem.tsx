import { motion } from "framer-motion";
import { worksans } from "@/app/fonts";
import { type PasswordItem as PasswordItemType } from "@/utils/types";

const PasswordItem = ({
  keyword,
  timesCopied,
  genPassword,
  type,
  handleCopy,
  handleDelete,
}: PasswordItemType) => {
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
        {timesCopied} | {keyword} | {type.toUpperCase()}
      </p>
      <p className="w-1/3 flex justify-center">{genPassword}</p>
      <div className="w-1/3 space-x-4 flex justify-end">
        <button
          className="hover:underline active:text-teal duration-100"
          onClick={() => handleCopy(keyword, genPassword ? genPassword : "")}
        >
          Copy
        </button>
        <button
          className="hover:underline active:text-maroon duration-100"
          onClick={() => handleDelete(keyword, type)}
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default PasswordItem;
