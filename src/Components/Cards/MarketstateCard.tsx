import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import React from 'react'

interface MarketStatCardProps {
  title: string;
  value: string | number | undefined;
  change?: string;
}

export default function MarketstateCard({ title, value, change }: MarketStatCardProps) {
    const isPositive = change?.startsWith("+");

  return (
     <div className="h-[200px] p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col gap-2 text-center border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">
        {title}
      </h4>

      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        {value}
      </p>

      {change && (
        <div
          className={`flex items-center justify-center text-sm font-semibold ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 mr-1" />
          )}
          {change}
        </div>
      )}
    </div>
  )
}
