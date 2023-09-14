import Link from "next/link";
import { ubuntu } from "../app/fonts";

export default function Navbar() {
  return (
    <nav className="mx-auto max-w-screen-xl px-4 my-3 bg-foreground rounded-lg">
      <div
        className={`flex flex-wrap mx-0 md:mx-16 items-center justify-between gap-y-4 sticky text-gray-900 ${ubuntu.className}`}
      >
        <Link
          className="font-bold border-foreground hover:border-custom-cyan border-t-[3px] border-b-[3px] px-2 py-2 duration-300"
          href="/"
        >
          Home
        </Link>
        <Link
          className="font-bold border-foreground hover:border-custom-cyan border-t-[3px] border-b-[3px] px-2 py-2 duration-300"
          href="/passwords"
        >
          Passwords
        </Link>
        <Link
          className="font-bold border-foreground hover:border-custom-cyan border-t-[3px] border-b-[3px] px-2 py-2 duration-300"
          href="/tasks"
        >
          Tasks
        </Link>
      </div>
    </nav>
  );
}
