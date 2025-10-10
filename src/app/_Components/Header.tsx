"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
 const {theme,setTheme} = useTheme()
 const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 
  return (
    <header className="w-full bg-gradient-to-r from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-2xl p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        
        {/* Logo & Site Name */}
        <div className="flex items-center mr-8 gap-4">
          <Image
            src="/assets/257-2574815_crypto-com-logo-svg-hd-png-download.png"
            alt="Crypto Land Logo"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Crypto Land
          </h1>
        </div>

        <p className="text-sm md:text-lg text-gray-700 dark:text-gray-300 text-center md:text-left">
          Stay ahead with live prices, charts, and news updates
        </p>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-4 text-gray-900 dark:text-white font-medium">
            <Link href="/" className="hover:text-blue-500">Home</Link>
            <Link href="/markets" className="hover:text-blue-500">Markets</Link>
            <Link href="/coins" className="hover:text-blue-500">Coins</Link>
            <Link href="/news" className="hover:text-blue-500">News</Link>
          </nav>

          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={theme === 'dark'}
                onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
              <div className={`w-14 h-8  dark:bg-gray-700 rounded-full shadow-inner ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
              <div className={` absolute left-1 top-1 w-6 h-6 bg-white dark:bg-gray-900 rounded-full transition-transform delay-200 duration-500 ease-in-out ${
                  theme === 'dark' ? "translate-x-full" : "translate-x-0"
                }`}
              ></div>
            </div>
            <span className="ml-3 text-gray-900 dark:text-white font-medium text-sm">
              {theme === 'dark'?'Dark Mode':'Light Mode'}
            </span>
          </label>
           <div className="flex border-2 rounded-2xl overflow-hidden min-w-[200px] min-h-[50px] text-center shadow-md">
      
      <div className="flex-1 border-r-2 border-gray-300transition-colors">
        <Link href="/login">
          <h4 className="text-xl text-gray-800 font-medium py-3 cursor-pointer">
            Login
          </h4>
        </Link>
      </div>

      <div className="flex-1 transition-colors">
        <Link href="/signup">
          <h4 className="text-xl text-gray-800 font-medium py-3 cursor-pointer">
            Sign Up
          </h4>
        </Link>
      </div>

    </div>
        </div>
      </div>
    </header>
  );
}
