"use client"

import { useEffect, useRef, useState } from "react"
import { createChart } from "lightweight-charts"
import { Button } from "@/components/ui/button"
import { CandlestickChart, LineChartIcon, BarChart, Maximize2, Minimize2, Plus, Minus } from "lucide-react"

interface CryptoChartProps {
  symbol: string
  timeframe: string
}

export function CryptoChart({ symbol, timeframe }: CryptoChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<any>(null)
  const [chartType, setChartType] = useState<"candles" | "line" | "bar">("candles")
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Generate sample data for demonstration
  const generateCandleData = () => {
    const data = []
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    let basePrice = 30000 // Starting price for BTC
    if (symbol === "ETHUSDT") basePrice = 2000
    if (symbol === "SOLUSDT") basePrice = 100
    if (symbol === "BNBUSDT") basePrice = 400
    if (symbol === "ADAUSDT") basePrice = 0.5

    // Generate 100 candles
    for (let i = 100; i >= 0; i--) {
      const time = new Date(now)
      time.setDate(time.getDate() - i)

      // Add some randomness to prices
      const volatility = basePrice * 0.03 // 3% volatility
      const open = basePrice + (Math.random() - 0.5) * volatility
      const high = open + Math.random() * volatility
      const low = open - Math.random() * volatility
      const close = low + Math.random() * (high - low)

      data.push({
        time: time.getTime() / 1000,
        open,
        high,
        low,
        close,
        volume: Math.floor(Math.random() * 1000) + 500,
      })

      // Update base price for next candle
      basePrice = close
    }

    return data
  }

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Clear previous chart
    if (chartRef.current) {
      chartRef.current.remove()
      chartRef.current = null
    }

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#000000" },
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: { color: "#1e222d" },
        horzLines: { color: "#1e222d" },
      },
      crosshair: {
        mode: 1, // Use numeric value instead of CrosshairMode.Normal
      },
      rightPriceScale: {
        borderColor: "#1e222d",
      },
      timeScale: {
        borderColor: "#1e222d",
      },
      handleScroll: true,
      handleScale: true,
    })

    chartRef.current = chart

    // Resize chart on container resize
    chart.applyOptions({
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
    })

    // Add series based on chart type
    const candleData = generateCandleData()

    if (chartType === "candles") {
      // Create a candlestick series
      const candleSeries = chart.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      })

      candleSeries.setData(candleData)
    } else if (chartType === "line") {
      const lineSeries = chart.addLineSeries({
        color: "#2962FF",
        lineWidth: 2,
      })

      lineSeries.setData(
        candleData.map((item) => ({
          time: item.time,
          value: item.close,
        })),
      )
    } else if (chartType === "bar") {
      const barSeries = chart.addBarSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
      })

      barSeries.setData(candleData)
    }

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    })

    volumeSeries.setData(
      candleData.map((item) => ({
        time: item.time,
        value: item.volume,
        color: item.close >= item.open ? "#26a69a" : "#ef5350",
      })),
    )

    // Fit content
    chart.timeScale().fitContent()

    // Cleanup
    return () => {
      if (chartRef.current) {
        chartRef.current.remove()
        chartRef.current = null
      }
    }
  }, [chartType, symbol, timeframe])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      chartContainerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex items-center justify-between p-2 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={chartType === "candles" ? "bg-gray-800" : ""}
            onClick={() => setChartType("candles")}
          >
            <CandlestickChart className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={chartType === "line" ? "bg-gray-800" : ""}
            onClick={() => setChartType("line")}
          >
            <LineChartIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={chartType === "bar" ? "bg-gray-800" : ""}
            onClick={() => setChartType("bar")}
          >
            <BarChart className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Minus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div ref={chartContainerRef} className="flex-1" />
    </div>
  )
}
