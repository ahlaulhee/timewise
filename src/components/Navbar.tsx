import Link from "next/link";
import { ubuntu } from "../app/fonts";

export default function Navbar() {
  return (
    <nav className="mx-auto max-w-screen-xl px-4 py-3 my-3 bg-foreground rounded-lg">
      <div
        className={`flex flex-wrap mx-0 md:mx-16 items-center justify-between gap-y-4 sticky text-gray-900 ${ubuntu.className}`}
      >
        <Link
          className="font-bold hover:text-main hover:tracking-widest duration-200"
          href="/"
        >
          Home
        </Link>
        <Link
          className="font-bold hover:text-main hover:tracking-widest duration-200"
          href="/passwords"
        >
          Passwords
        </Link>
        <Link
          className="font-bold hover:text-main hover:tracking-widest duration-200"
          href="/tasks"
        >
          Tasks
        </Link>
      </div>
    </nav>
  );
}
