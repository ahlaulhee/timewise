"use client";

import { generatePassword } from "@/utils/generatePassword";
import { useState } from "react";

export default function Passwords() {
  const [generatedPassword, setGeneratedPassword] = useState("");
  return (
    <div>
      <button
        onClick={() =>
          setGeneratedPassword(
            generatePassword(
              "ahlaulhe@gmail.com",
              "raccoonferretgamingglasses",
              "testing"
            )
          )
        }
      >
        GENERATE PASSWORD
      </button>
      <p>{generatedPassword}</p>
    </div>
  );
}
