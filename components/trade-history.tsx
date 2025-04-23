"use client"

interface TradeHistoryProps {
  symbol: string
}

export function TradeHistory({ symbol }: TradeHistoryProps) {
  // Generate sample trade history data
  const generateTradeHistory = () => {
    let basePrice = 30000 // For BTC
    if (symbol === "ETHUSDT") basePrice = 2000
    if (symbol === "SOLUSDT") basePrice = 100
    if (symbol === "BNBUSDT") basePrice = 400
    if (symbol === "ADAUSDT") basePrice = 0.5

    const trades = []

    // Generate 20 trades
    for (let i = 0; i < 20; i++) {
      const isBuy = Math.random() > 0.5
      const price = basePrice + (Math.random() - 0.5) * basePrice * 0.01
      const amount = Math.random() * 2 + 0.01
      const time = new Date()
      time.setMinutes(time.getMinutes() - i)

      trades.push({
        price: price.toFixed(2),
        amount: amount.toFixed(4),
        time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        type: isBuy ? "buy" : "sell",
      })
    }

    return trades
  }

  const trades = generateTradeHistory()

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b border-gray-800">
        <div className="text-sm font-medium">Trade History</div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="grid grid-cols-3 text-xs text-gray-500 p-2 border-b border-gray-800">
          <div>Price (USDT)</div>
          <div className="text-right">Amount</div>
          <div className="text-right">Time</div>
        </div>

        {/* Trades */}
        <div className="overflow-y-auto flex-1">
          {trades.map((trade, index) => (
            <div key={index} className="grid grid-cols-3 text-xs p-1 hover:bg-gray-800">
              <div className={trade.type === "buy" ? "text-green-500" : "text-red-500"}>{trade.price}</div>
              <div className="text-right">{trade.amount}</div>
              <div className="text-right text-gray-400">{trade.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
