"use client"

interface OrderBookProps {
  symbol: string
}

export function OrderBook({ symbol }: OrderBookProps) {
  // Generate sample order book data
  const generateOrderBook = () => {
    let basePrice = 30000 // For BTC
    if (symbol === "ETHUSDT") basePrice = 2000
    if (symbol === "SOLUSDT") basePrice = 100
    if (symbol === "BNBUSDT") basePrice = 400
    if (symbol === "ADAUSDT") basePrice = 0.5

    const asks = []
    const bids = []

    // Generate 10 asks (sell orders)
    for (let i = 1; i <= 10; i++) {
      const price = basePrice + i * basePrice * 0.001
      const size = Math.random() * 5 + 0.1
      const total = price * size

      asks.push({
        price: price.toFixed(2),
        size: size.toFixed(4),
        total: total.toFixed(2),
      })
    }

    // Generate 10 bids (buy orders)
    for (let i = 1; i <= 10; i++) {
      const price = basePrice - i * basePrice * 0.001
      const size = Math.random() * 5 + 0.1
      const total = price * size

      bids.push({
        price: price.toFixed(2),
        size: size.toFixed(4),
        total: total.toFixed(2),
      })
    }

    // Sort asks in descending order (highest first)
    asks.sort((a, b) => Number.parseFloat(b.price) - Number.parseFloat(a.price))

    return { asks, bids }
  }

  const { asks, bids } = generateOrderBook()

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b border-gray-800 flex justify-between items-center">
        <div className="text-sm font-medium">Order Book</div>
        <div className="text-xs text-gray-400">Depth: 0.1%</div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="grid grid-cols-3 text-xs text-gray-500 p-2 border-b border-gray-800">
          <div>Price (USDT)</div>
          <div className="text-right">Amount</div>
          <div className="text-right">Total</div>
        </div>

        {/* Asks (Sell Orders) */}
        <div className="overflow-y-auto flex-1">
          {asks.map((ask, index) => (
            <div key={`ask-${index}`} className="grid grid-cols-3 text-xs p-1 hover:bg-gray-800">
              <div className="text-red-500">{ask.price}</div>
              <div className="text-right">{ask.size}</div>
              <div className="text-right">{ask.total}</div>
              <div
                className="col-span-3 h-1 bg-red-900/20"
                style={{ width: `${Number.parseFloat(ask.size) * 20}%` }}
              ></div>
            </div>
          ))}
        </div>

        {/* Current Price */}
        <div className="bg-gray-800 p-2 text-center font-bold">
          {symbol === "BTCUSDT" && "30,245.67"}
          {symbol === "ETHUSDT" && "2,045.12"}
          {symbol === "SOLUSDT" && "103.45"}
          {symbol === "BNBUSDT" && "412.78"}
          {symbol === "ADAUSDT" && "0.4523"}
        </div>

        {/* Bids (Buy Orders) */}
        <div className="overflow-y-auto flex-1">
          {bids.map((bid, index) => (
            <div key={`bid-${index}`} className="grid grid-cols-3 text-xs p-1 hover:bg-gray-800">
              <div className="text-green-500">{bid.price}</div>
              <div className="text-right">{bid.size}</div>
              <div className="text-right">{bid.total}</div>
              <div
                className="col-span-3 h-1 bg-green-900/20"
                style={{ width: `${Number.parseFloat(bid.size) * 20}%` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
