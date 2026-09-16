"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DashboardContent from "./Components/DashboardContent";
import { useUser } from "@/Hooks/UseUser";
import { useTheme } from "next-themes";
import { ArrowLeftRight, ChartCandlestick, Home, Settings, Star, Wallet } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const {user} = useUser()
  const {theme,setTheme} = useTheme()
  const [activeTab, setActiveTab] = useState("Overview");
  const menu = [
    { name: "Overview", icon: <Home/> },
    { name: "Portfolio", icon: <ChartCandlestick/> },
    { name: "Watchlist", icon: <Star/> },
    { name: "Wallet", icon: <Wallet/> },
    { name: "Transactions", icon: <ArrowLeftRight/>},
    { name: "Settings", icon: <Settings/> },
  ];
  return (
    <>
      <header className="w-full h-20 bg-gray-100">
        <div className="flex justify-between items-center px-4">
          <Link href={'/'}>
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
              </Link>
          <div>
            <h4 className="text-2xl text-gray-700">Wellcome {user?.username}!</h4>
          </div>
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
        </div>
      </header>
      <div className="flex min-h-screen mt-2">
        <aside className="hidden md:flex w-72 flex-col rounded-2xl  dark:bg-gray-900 bg-white transition-colors delay-100  border-r border-gray-200 dark:border-gray-800 shadow-lg">
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

          <nav className="flex-1 px-4 py-6 space-y-2">
            {menu.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center gap-3 cursor-pointer rounded-xl px-4 py-3 w-full font-medium transition-all

                ${
                  activeTab === item.name
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </button>
            ))}
          </nav>

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
          <DashboardContent activeTab={activeTab} />
        </main>
      </div>
    </>
  );
}
