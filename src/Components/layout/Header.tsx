"use client";

import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
   const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <header className="min-w-[648px] bg-gradient-to-r from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-xl">
      <div className="w-full flex items-center justify-between px-4 md:px-6 py-4">
        <div className="flex items-center gap-3 shrink-0">
          <Image
            src="/assets/257-2574815_crypto-com-logo-svg-hd-png-download.png"
            alt="Crypto Land Logo"
            width={45}
            height={45}
            className="rounded-full object-cover"
          />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
            Crypto Land
          </h1>
        </div>

        <nav className="hidden lg:flex items-center justify-center gap-8 text-gray-800 dark:text-gray-100 font-medium whitespace-nowrap">
          <Link href="/" className="hover:text-blue-500 transition-colors">
            Home
          </Link>
          <Link
            href="/markets"
            className="hover:text-blue-500 transition-colors"
          >
            Markets
          </Link>
          <Link href="/coins" className="hover:text-blue-500 transition-colors">
            Coins
          </Link>
          <Link href="/news" className="hover:text-blue-500 transition-colors">
            News
          </Link>
          <Link href="/nfts" className="hover:text-blue-500 transition-colors">
            NFTs
          </Link>
          <Link
            href="/contact"
            className="hover:text-blue-500 transition-colors"
          >
            Contact Us
          </Link>
          <Link href="/about" className="hover:text-blue-500 transition-colors">
            About Us
          </Link>
        </nav>

        <div className="flex items-center gap-6 shrink-0">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={theme === "dark"}
                onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
              <div
                className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`absolute left-1 top-1 w-4 h-4 bg-white dark:bg-gray-900 rounded-full transition-transform duration-500 ease-in-out ${
                  theme === "dark" ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </div>
            <span className="ml-3 text-gray-900 dark:text-white font-medium text-sm whitespace-nowrap">
              {theme === "dark" ? "Dark Mode" : "Light Mode"}
            </span>
          </label>

          <div className="flex border border-gray-300 rounded-xl overflow-hidden shadow-md">
            <Link
              href="/login"
              className="px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium border-l border-gray-300"
            >
              Sign Up
            </Link>
          </div>
           <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gray-800 dark:text-gray-100"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
        {menuOpen && (
        <div className="lg:hidden flex flex-col items-center gap-4 pb-6 text-gray-800 dark:text-gray-100 font-medium border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/markets" onClick={() => setMenuOpen(false)}>Markets</Link>
          <Link href="/coins" onClick={() => setMenuOpen(false)}>Coins</Link>
          <Link href="/news" onClick={() => setMenuOpen(false)}>News</Link>
          <Link href="/nfts" onClick={() => setMenuOpen(false)}>NFTs</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
        </div>
      )}
    </header>
  );
}
