import cryptojs from "crypto-js";

const symbols = "!@#$%^&*()";

export const generatePassword = (
  gmail: string,
  masterpassword: string,
  keyword: string
) => {
  if (!gmail || !masterpassword || !keyword) return;
  const data = gmail + masterpassword + keyword;
  const hash = cryptojs.SHA256(data).toString(cryptojs.enc.Base64);
  const characters = hash.match(/[a-z]+/gi)?.join("") || "";
  const numbers = hash.match(/\d+/g)?.join("") || "";
  //   const specialCharacters = hash.match(/[^a-z\d]+/gi)?.join("") || "";

  if (characters.length < 12 || !numbers.length) {
    return "The hashed info doesn't contain enough characters to generate a secure password.";
  }

  const password =
    characters.slice(0, 12) + numbers[0] + symbols[Number(numbers[0])];

  return password;
};
