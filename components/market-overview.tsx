"use client"

import { ArrowDown, ArrowUp } from "lucide-react"

export function MarketOverview() {
  const markets = [
    { symbol: "BTC/USDT", price: "30,245.67", change: 2.34 },
    { symbol: "ETH/USDT", price: "2,045.12", change: 1.56 },
    { symbol: "SOL/USDT", price: "103.45", change: 5.67 },
    { symbol: "BNB/USDT", price: "412.78", change: -0.89 },
    { symbol: "ADA/USDT", price: "0.4523", change: -1.23 },
  ]

  return (
    <div className="space-y-2">
      {markets.map((market, index) => (
        <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-md cursor-pointer">
          <div className="font-medium">{market.symbol}</div>
          <div className="flex flex-col items-end">
            <div>${market.price}</div>
            <div className={`text-xs flex items-center ${market.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {market.change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {Math.abs(market.change)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
