'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DashboardContent from "./Components/DashboardContent";

export default function Dashboard() {
const router = useRouter()
const [activeTab,setActiveTab] = useState('Overview')
  const menu = [
    { name: "Overview",  icon: "🏠" },
    { name: "Portfolio", icon: "📈" },
    { name: "Watchlist",  icon: "⭐" },
    { name: "Wallet", icon: "💰" },
    { name: "Transactions", icon: "📑" },
    { name: "Settings", icon: "⚙️" },
  ];
  return (
    <>
    

<div className="flex min-h-screen mt-2">
        {/* Sidebar */}
        <aside className="hidden md:flex w-72 flex-col rounded-2xl  dark:bg-gray-900 bg-white transition-colors delay-100  border-r border-gray-200 dark:border-gray-800 shadow-lg">

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
              <button
                key={item.name}
                onClick={()=>setActiveTab(item.name)}
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
          <DashboardContent activeTab={activeTab}/>
        </main>

      </div>

    </>
  );
}