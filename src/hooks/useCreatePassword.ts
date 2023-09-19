import { useState } from "react";
import { type Keyword } from "@/utils/types";

const useCreatePassword = () => {
  const [generatedPassword, setGeneratedPassword] = useState("...");
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("long");

  const createPassword = (userId: string, keyword: string, type: string) => {
    // TODO: Add validations
    // TODO: Add notifications
    const retrievedKeywords = localStorage.getItem("keywords");
    const keywords: Keyword[] = retrievedKeywords
      ? JSON.parse(retrievedKeywords)
      : [];

    keywords.push({
      userId: userId,
      keyword: keyword,
      type: type,
      timesCopied: 0,
    });

    localStorage.setItem("keywords", JSON.stringify(keywords));
  };

  return {
    generatedPassword,
    setGeneratedPassword,
    keyword,
    setKeyword,
    type,
    setType,
    createPassword,
  };
};

export default useCreatePassword;
