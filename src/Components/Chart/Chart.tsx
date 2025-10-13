'use client'

import { formatCurrency } from '@/utils/formatCurrency'
import { MarketPoint } from '@/Interfaces/crypto/chart'
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
  height?: number
  width?:number
}

export default function Chart({
  data,
  showMarketCap = false,
  showVolume = false,
  height = 400,
  width,
}:ChartProps) {
  if (!data || data.length === 0) return <p className="text-center">No data available</p>

  return (
    <div className='w-full   dark:bg-neutral-900 p-4 rounded-2xl shadow-md'>
      <ResponsiveContainer width="100%" height={height} minWidth={width}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date"  />
         <YAxis yAxisId="left"orientation="left" tickFormatter={formatCurrency}/>
          <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']} />
          <Legend />
          <Line
              type="monotone"
              dataKey="price"
              stroke="#00b894"
              strokeWidth={2}
              dot={false}
              name="Price (USD)"
              yAxisId='left'
              />

          {showMarketCap && (
            <Line
              type="monotone"
              dataKey="marketCap"
              stroke="#0984e3"
              strokeWidth={2}
              dot={false}
              name="Market Cap (USD)"
            />
          )}

        
          {showVolume && (
            <Line
              type="monotone"
              dataKey="volume"
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
