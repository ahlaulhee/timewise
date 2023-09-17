"use client";

import { useEffect, useState } from "react";
import { ubuntu } from "../fonts";
import { FaUser, FaLock } from "react-icons/fa6";
import { getCsrfToken, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [userData, setUserData] = useState<{
    name: string;
    password: string;
  }>({
    name: "",
    password: "",
  });
  const {
    data: session,
    status,
  }: { data: any; status: "loading" | "authenticated" | "unauthenticated" } =
    useSession();
  const [csrfToken, setCsrfToken] = useState<string | undefined>();

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/passwords");
    }
    const fetchCsrfToken = async () => {
      const csrfToken = await getCsrfToken();
      setCsrfToken(csrfToken);
    };
    fetchCsrfToken();
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className={`${ubuntu.className} flex justify-center items-center py-8`}
    >
      <form
        className="w-[28rem] h-[25rem] bg-foreground flex flex-col justify-around items-center rounded shadow-lg p-8"
        method="post"
        action="/api/auth/callback/credentials"
      >
        <p className="text-2xl font-bold text-gray-700">LOGIN</p>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div className="relative w-[90%] flex justify-center">
          <input
            className="w-full border border-gray-300 p-2 rounded bg-main pl-10 focus:border-blue-500 transition duration-200"
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Full Name"
          />
          <FaUser className="absolute left-2 top-2 h-6 w-6 text-gray-400" />
        </div>
        <div className="relative w-[90%] flex justify-center">
          <input
            className="w-full border border-gray-300 p-2 rounded bg-main pl-10 focus:border-blue-500 transition duration-200"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
          <FaLock className="absolute left-2 top-2 h-6 w-6 text-gray-400" />
        </div>
        <button
          className="w-[80%] border rounded p-2 bg-blue-500 text-white hover:bg-blue-700 transition duration-200"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
