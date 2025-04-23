"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { CandlestickChart, LineChartIcon, BarChart, Maximize2, Minimize2, Plus, Minus } from "lucide-react"

interface CryptoChartProps {
  symbol: string
  timeframe: string
}

export function CryptoChart({ symbol, timeframe }: CryptoChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
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
        time: time.getTime(),
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

    const initializeChart = async () => {
      try {
        // Dynamically import the library to avoid SSR issues
        const LightweightCharts = await import("lightweight-charts")

        // Clear previous chart
        chartContainerRef.current.innerHTML = ""

        // Create chart
        const chart = LightweightCharts.createChart(chartContainerRef.current, {
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
          layout: {
            background: { color: "#000000" },
            textColor: "#d1d4dc",
          },
          grid: {
            vertLines: { color: "#1e222d" },
            horzLines: { color: "#1e222d" },
          },
          crosshair: {
            mode: 1, // Normal crosshair mode
          },
          rightPriceScale: {
            borderColor: "#1e222d",
          },
          timeScale: {
            borderColor: "#1e222d",
          },
        })

        // Add series based on chart type
        const candleData = generateCandleData()

        if (chartType === "candles") {
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

        // Handle window resize
        const handleResize = () => {
          if (chartContainerRef.current) {
            chart.applyOptions({
              width: chartContainerRef.current.clientWidth,
              height: chartContainerRef.current.clientHeight,
            })
          }
        }

        window.addEventListener("resize", handleResize)

        // Return cleanup function
        return () => {
          window.removeEventListener("resize", handleResize)
          chart.remove()
        }
      } catch (error) {
        console.error("Error initializing chart:", error)
        // Fallback to a simple canvas rendering
        renderFallbackChart()
      }
    }

    // Initialize the chart
    const chartCleanup = initializeChart()

    // Cleanup function
    return () => {
      chartCleanup.then((cleanup) => cleanup && cleanup())
    }
  }, [chartType, symbol, timeframe])

  // Fallback chart rendering using canvas
  const renderFallbackChart = () => {
    if (!chartContainerRef.current) return

    // Clear previous content
    chartContainerRef.current.innerHTML = ""

    // Create canvas element
    const canvas = document.createElement("canvas")
    canvas.width = chartContainerRef.current.clientWidth
    canvas.height = chartContainerRef.current.clientHeight
    chartContainerRef.current.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set background
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Generate data
    const data = generateCandleData()

    // Find min and max values for scaling
    let minPrice = Math.min(...data.map((d) => d.low))
    let maxPrice = Math.max(...data.map((d) => d.high))
    const range = maxPrice - minPrice
    minPrice -= range * 0.05
    maxPrice += range * 0.05

    // Calculate scaling factors
    const xScale = canvas.width / data.length
    const yScale = canvas.height / (maxPrice - minPrice)

    // Draw grid
    ctx.strokeStyle = "#1e222d"
    ctx.lineWidth = 0.5

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = (i * canvas.height) / 5
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()

      // Price labels
      const price = maxPrice - (i * (maxPrice - minPrice)) / 5
      ctx.fillStyle = "#d1d4dc"
      ctx.font = "10px Arial"
      ctx.fillText(price.toFixed(2), 5, y - 5)
    }

    // Draw candles or line based on chart type
    if (chartType === "candles" || chartType === "bar") {
      // Draw candles
      data.forEach((candle, i) => {
        const x = i * xScale
        const open = canvas.height - (candle.open - minPrice) * yScale
        const close = canvas.height - (candle.close - minPrice) * yScale
        const high = canvas.height - (candle.high - minPrice) * yScale
        const low = canvas.height - (candle.low - minPrice) * yScale

        // Determine if candle is up or down
        const isUp = candle.close > candle.open
        ctx.strokeStyle = isUp ? "#26a69a" : "#ef5350"
        ctx.fillStyle = isUp ? "#26a69a" : "#ef5350"

        // Draw wick
        ctx.beginPath()
        ctx.moveTo(x + xScale / 2, high)
        ctx.lineTo(x + xScale / 2, low)
        ctx.stroke()

        // Draw body
        if (chartType === "candles") {
          const bodyHeight = Math.abs(close - open)
          ctx.fillRect(
            x + xScale * 0.2,
            Math.min(open, close),
            xScale * 0.6,
            bodyHeight || 1, // Ensure at least 1px height
          )
        }
      })
    } else if (chartType === "line") {
      // Draw line chart
      ctx.strokeStyle = "#2962FF"
      ctx.lineWidth = 2
      ctx.beginPath()

      data.forEach((point, i) => {
        const x = i * xScale
        const y = canvas.height - (point.close - minPrice) * yScale

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()
    }

    // Draw time labels
    ctx.fillStyle = "#d1d4dc"
    ctx.font = "10px Arial"

    for (let i = 0; i < data.length; i += Math.floor(data.length / 5)) {
      const x = i * xScale
      const date = new Date(data[i].time)
      const label = date.toLocaleDateString()
      ctx.fillText(label, x, canvas.height - 5)
    }
  }

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
