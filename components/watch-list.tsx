"use client"

import { ArrowDown, ArrowUp, Star } from "lucide-react"

interface WatchListProps {
  currentSymbol: string
  onSelectSymbol: (symbol: string) => void
}

export function WatchList({ currentSymbol, onSelectSymbol }: WatchListProps) {
  const watchlist = [
    { symbol: "BTCUSDT", name: "Bitcoin", price: "30,245.67", change: 2.34 },
    { symbol: "ETHUSDT", name: "Ethereum", price: "2,045.12", change: 1.56 },
    { symbol: "SOLUSDT", name: "Solana", price: "103.45", change: 5.67 },
    { symbol: "BNBUSDT", name: "Binance Coin", price: "412.78", change: -0.89 },
    { symbol: "ADAUSDT", name: "Cardano", price: "0.4523", change: -1.23 },
    { symbol: "XRPUSDT", name: "Ripple", price: "0.5678", change: 3.45 },
    { symbol: "DOGEUSDT", name: "Dogecoin", price: "0.0789", change: -2.34 },
    { symbol: "DOTUSDT", name: "Polkadot", price: "6.78", change: 1.23 },
    { symbol: "AVAXUSDT", name: "Avalanche", price: "34.56", change: 4.56 },
    { symbol: "MATICUSDT", name: "Polygon", price: "0.8976", change: 2.78 },
  ]

  return (
    <div className="space-y-1">
      {watchlist.map((item, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-2 hover:bg-gray-800 rounded-md cursor-pointer ${currentSymbol === item.symbol ? "bg-gray-800" : ""}`}
          onClick={() => onSelectSymbol(item.symbol)}
        >
          <div className="flex items-center">
            <Star
              className={`h-3 w-3 mr-2 ${currentSymbol === item.symbol ? "text-yellow-500 fill-yellow-500" : "text-gray-500"}`}
            />
            <div>
              <div className="font-medium">{item.symbol}</div>
              <div className="text-xs text-gray-400">{item.name}</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div>${item.price}</div>
            <div className={`text-xs flex items-center ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {item.change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {Math.abs(item.change)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
