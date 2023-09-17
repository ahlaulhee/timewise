import cryptojs from "crypto-js";

const symbols = "!@#$%^&*()";

export const generatePassword = (
  name: string,
  masterpassword: string,
  keyword: string,
  type: string = "long"
) => {
  if (!name || !masterpassword || !keyword) return;
  const data = name + masterpassword + keyword;
  const hash = cryptojs.SHA256(data).toString(cryptojs.enc.Base64);
  const characters = hash.match(/[a-z]+/gi)?.join("") || "";
  const numbers = hash.match(/\d+/g)?.join("") || "";
  //   const specialCharacters = hash.match(/[^a-z\d]+/gi)?.join("") || "";

  if (characters.length < 12 || !numbers.length) {
    return "The hashed info doesn't contain enough characters to generate a secure password.";
  }
  let password = "";
  switch (type) {
    case "verylong":
      password =
        characters.slice(0, 16) + numbers[0] + symbols[Number(numbers[0])];
      break;
    case "long":
      password =
        characters.slice(0, 12) + numbers[0] + symbols[Number(numbers[0])];
      break;
    case "short":
      password =
        characters.slice(0, 8) + numbers[0] + symbols[Number(numbers[0])];
      break;
    case "pin":
      password = numbers.repeat(6).slice(0, 6);
      break;
    default:
      // password =
      //   characters.slice(0, 12) + numbers[0] + symbols[Number(numbers[0])];
      break;
  }
  return password;
};
