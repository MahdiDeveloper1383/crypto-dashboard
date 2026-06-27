'use client'

import Footer from "@/Components/layout/Footer";
import Header from "@/Components/layout/Header";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const menu = [
    { name: "Overview", href: "/dashboard", icon: "🏠" },
    { name: "Portfolio", href: "/dashboard/portfolio", icon: "📈" },
    { name: "Watchlist", href: "/dashboard/watchlist", icon: "⭐" },
    { name: "Wallet", href: "/dashboard/wallet", icon: "💰" },
    { name: "Transactions", href: "/dashboard/transactions", icon: "📑" },
    { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
  ];
  
  return (
    <>
      <Header />

<div className="flex min-h-screen mt-2">
        {/* Sidebar */}
        <aside className="hidden md:flex w-72 flex-col rounded-2xl  dark:bg-gray-900 bg-white transition-colors delay-100 hover:bg-gray-950 border-r border-gray-200 dark:border-gray-800 shadow-lg">

          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200 dark:border-gray-800">
            <Image
              src="/assets/257-2574815_crypto-com-logo-svg-hd-png-download.png"
              alt="logo"
              width={45}
              height={45}
              className="rounded-full"
            />

            <h2 className="text-xl font-bold text-black dark:text-white">
              Crypto Land
            </h2>
          </div>

          {/* Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2">

            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all

                ${
                  pathname === item.href
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            ))}

          </nav>

          {/* Bottom Button */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">

            <button
              onClick={() => router.push("/")}
              className="w-full rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
            >
              ← Back to Site
            </button>

          </div>

        </aside>

        {/* Main */}
        <main className="flex-1 p-8">
          {children}
        </main>

      </div>

      <Footer />
    </>
  );
}