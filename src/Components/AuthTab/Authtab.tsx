'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Authtab() {
  const pathname = usePathname();
  return (
    <div className="flex w-full max-w-[340px]  overflow-hidden rounded-full border border-white shadow-2xl">
      <Link
        href={'/login'}
        className={`flex cursor-pointer flex-1 items-center justify-center py-3 whitespace-nowrap transition hover:bg-blue-500/10 hover:text-blue-600 ${pathname === "/login" ? "bg-blue-500 text-white" : ""}`}
      >
        Login
      </Link>
      <Link
      href={'/signup'}
        className={`flex cursor-pointer flex-1 items-center justify-center border-l py-3 whitespace-nowrap transition hover:bg-blue-500/10 hover:text-blue-600 ${pathname === "/signup" ? "bg-blue-500 text-white" : ""}`}
      >
        Sign Up
      </Link>
    </div>
  );
}

export default Authtab;
