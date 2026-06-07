import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

function Authtab() {
  const Router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex w-full max-w-[340px]  overflow-hidden rounded-full border border-white shadow-2xl">
      <button
        onClick={() => Router.push("/login")}
        className={`flex cursor-pointer flex-1 items-center justify-center py-3 whitespace-nowrap transition hover:bg-blue-500/10 hover:text-blue-600 ${pathname === "/login" ? "bg-blue-500 text-white" : ""}`}
      >
        Login
      </button>
      <button
        onClick={() => Router.push("/signup")}
        className={`flex cursor-pointer flex-1 items-center justify-center border-l py-3 whitespace-nowrap transition hover:bg-blue-500/10 hover:text-blue-600 ${pathname === "/signup" ? "bg-blue-500 text-white" : ""}`}
      >
        Sign Up
      </button>
    </div>
  );
}

export default Authtab;
