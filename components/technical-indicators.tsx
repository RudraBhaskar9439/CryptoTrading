"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

export function TechnicalIndicators() {
  const [searchTerm, setSearchTerm] = useState("")

  const indicators = [
    { category: "trend", name: "Moving Average (MA)", description: "Simple moving average" },
    { category: "trend", name: "Exponential Moving Average (EMA)", description: "Exponential moving average" },
    { category: "trend", name: "Bollinger Bands (BB)", description: "Volatility bands" },
    {
      category: "trend",
      name: "Moving Average Convergence Divergence (MACD)",
      description: "Trend-following momentum indicator",
    },
    { category: "oscillator", name: "Relative Strength Index (RSI)", description: "Momentum oscillator" },
    {
      category: "oscillator",
      name: "Stochastic Oscillator",
      description: "Momentum indicator comparing closing price to price range",
    },
    {
      category: "oscillator",
      name: "Commodity Channel Index (CCI)",
      description: "Oscillator to identify cyclical trends",
    },
    { category: "volume", name: "On-Balance Volume (OBV)", description: "Volume-based momentum indicator" },
    { category: "volume", name: "Volume Profile", description: "Shows trading activity at specific price levels" },
    { category: "volume", name: "Money Flow Index (MFI)", description: "Volume-weighted RSI" },
    { category: "volatility", name: "Average True Range (ATR)", description: "Market volatility indicator" },
    { category: "volatility", name: "Keltner Channel", description: "Volatility-based envelope" },
  ]

  const filteredIndicators = indicators.filter(
    (indicator) =>
      indicator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      indicator.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const renderIndicatorList = (category) => {
    const categoryIndicators = filteredIndicators.filter((i) => i.category === category)

    if (categoryIndicators.length === 0) {
      return <div className="text-gray-500 text-sm py-2">No indicators found</div>
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {categoryIndicators.map((indicator, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="justify-start text-left h-auto py-2 border-gray-700 hover:bg-gray-800"
          >
            <div>
              <div className="font-medium">{indicator.name}</div>
              <div className="text-xs text-gray-400">{indicator.description}</div>
            </div>
          </Button>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search indicators..."
          className="w-full bg-gray-900 border-gray-700 pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="trend">
        <TabsList className="bg-gray-900 border border-gray-800 p-1">
          <TabsTrigger value="trend" className="data-[state=active]:bg-gray-800">
            Trend
          </TabsTrigger>
          <TabsTrigger value="oscillator" className="data-[state=active]:bg-gray-800">
            Oscillators
          </TabsTrigger>
          <TabsTrigger value="volume" className="data-[state=active]:bg-gray-800">
            Volume
          </TabsTrigger>
          <TabsTrigger value="volatility" className="data-[state=active]:bg-gray-800">
            Volatility
          </TabsTrigger>
        </TabsList>
        <TabsContent value="trend" className="mt-2">
          {renderIndicatorList("trend")}
        </TabsContent>
        <TabsContent value="oscillator" className="mt-2">
          {renderIndicatorList("oscillator")}
        </TabsContent>
        <TabsContent value="volume" className="mt-2">
          {renderIndicatorList("volume")}
        </TabsContent>
        <TabsContent value="volatility" className="mt-2">
          {renderIndicatorList("volatility")}
        </TabsContent>
      </Tabs>
    </div>
  )
}
