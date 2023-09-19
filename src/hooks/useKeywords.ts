// Custom Hook
import { Toast } from "@/utils/Toast";
import { type Keyword } from "@/utils/types";
import { useState, useEffect } from "react";

const useKeywordManagement = (session: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [keywords, setKeywords] = useState<Keyword[]>([]);

  const getKeywords = (): Keyword[] => {
    const retrievedKeywords = localStorage.getItem("keywords");
    return retrievedKeywords ? JSON.parse(retrievedKeywords) : [];
  };

  const filterKeywords = (input: string) => {
    const keywords = getKeywords();
    const userKeywords = keywords.filter(
      (keyword: Keyword) =>
        keyword.userId === session?.user?.id &&
        keyword.keyword.toLowerCase().includes(input.toLowerCase())
    );
    setKeywords(userKeywords);
  };

  useEffect(() => {
    const keywords = getKeywords();
    const userKeywords = keywords.filter(
      (keyword) => keyword.userId === session?.user?.id
    );
    setKeywords(userKeywords);
  }, [session?.user?.id, modalOpen]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    filterKeywords(e.target.value);
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
      (keyword) => !(keyword.keyword === keyw && keyword.type === type)
    );
    localStorage.setItem("keywords", JSON.stringify(updatedKeywords));
    const userKeywords = updatedKeywords.filter(
      (keyword) =>
        // keyword.keyword.toLowerCase().includes(searchInput.toLowerCase()) &&
        keyword.userId === session?.user?.id
    );
    setSearchInput("");
    setKeywords(userKeywords);
    Toast.fire({
      icon: "success",
      title: `The password for ${keyw} was deleted successfully.`,
    });
  };

  return {
    searchInput,
    keywords,
    handleSearch,
    handleCopy,
    handleDelete,
    modalOpen,
    setModalOpen,
  };
};

export default useKeywordManagement;
