'use client'

import { MarketPoint } from '@/app/interfaces/chart'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts'

interface ChartProps {
  data: MarketPoint[]
  showMarketCap?: boolean
  showVolume?: boolean
  showPrice?:boolean
  height?: number
}



export default function Chart({
  data,
  showMarketCap = false,
  showVolume = false,
  showPrice = false,
  height = 400
}:ChartProps) {
  if (!data || data.length === 0) return <p className="text-center">No data available</p>

  return (
    <div className="w-full bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow-md">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />


          {showPrice&&(<Line
            type="monotone"
            dataKey="price"
            stroke="#00b894"
            strokeWidth={2}
            dot={false}
            name="Price (USD)"
          />
          )}

          {showMarketCap && (
            <Line
              type="monotone"
              dataKey="market_caps"
              stroke="#0984e3"
              strokeWidth={2}
              dot={false}
              name="Market Cap (USD)"
            />
          )}

        
          {showVolume && (
            <Line
              type="monotone"
              dataKey="total_volumes"
              stroke="#e17055"
              strokeWidth={2}
              dot={false}
              name="Volume (USD)"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
