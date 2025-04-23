"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, ChevronDown, LogOut, Menu, PanelRight, Search, Settings, User, Wallet } from "lucide-react"
import { CryptoChart } from "@/components/crypto-chart"
import { TechnicalIndicators } from "@/components/technical-indicators"
import { MarketOverview } from "@/components/market-overview"
import { WatchList } from "@/components/watch-list"
import { OrderBook } from "@/components/order-book"
import { TradeHistory } from "@/components/trade-history"

export default function Dashboard() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)
  const [walletAddress, setWalletAddress] = useState("")
  const [currentSymbol, setCurrentSymbol] = useState("BTCUSDT")
  const [timeframe, setTimeframe] = useState("1D")

  useEffect(() => {
    // Check if wallet is connected
    const checkWalletConnection = async () => {
      try {
        if (typeof window !== "undefined" && window.ethereum) {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            setWalletAddress(accounts[0])
          } else {
            // No connected account found, redirect to login
            router.push("/login")
          }
        } else {
          // MetaMask not installed, redirect to login
          router.push("/login")
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error)
        router.push("/login")
      }
    }

    checkWalletConnection()
  }, [router])

  const disconnectWallet = () => {
    setWalletAddress("")
    router.push("/login")
  }

  const formatWalletAddress = (address: string) => {
    if (!address) return ""
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <header className="h-14 border-b border-gray-800 flex items-center px-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold">CT</div>
          <span className="text-lg font-bold hidden md:inline">CryptoTrade</span>
        </div>

        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2 ml-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-700 bg-gray-900 text-white">
                {currentSymbol}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 border-gray-700">
              <DropdownMenuItem onClick={() => setCurrentSymbol("BTCUSDT")}>BTCUSDT</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentSymbol("ETHUSDT")}>ETHUSDT</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentSymbol("SOLUSDT")}>SOLUSDT</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentSymbol("BNBUSDT")}>BNBUSDT</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentSymbol("ADAUSDT")}>ADAUSDT</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="hidden md:flex items-center gap-2 ml-4">
          <Button
            variant="ghost"
            size="sm"
            className={timeframe === "1m" ? "bg-gray-800" : ""}
            onClick={() => setTimeframe("1m")}
          >
            1m
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={timeframe === "5m" ? "bg-gray-800" : ""}
            onClick={() => setTimeframe("5m")}
          >
            5m
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={timeframe === "15m" ? "bg-gray-800" : ""}
            onClick={() => setTimeframe("15m")}
          >
            15m
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={timeframe === "1H" ? "bg-gray-800" : ""}
            onClick={() => setTimeframe("1H")}
          >
            1H
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={timeframe === "4H" ? "bg-gray-800" : ""}
            onClick={() => setTimeframe("4H")}
          >
            4H
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={timeframe === "1D" ? "bg-gray-800" : ""}
            onClick={() => setTimeframe("1D")}
          >
            1D
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={timeframe === "1W" ? "bg-gray-800" : ""}
            onClick={() => setTimeframe("1W")}
          >
            1W
          </Button>
        </div>

        <div className="flex-1 hidden md:block">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search markets..."
              className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-700 bg-gray-900 text-white">
                <Wallet className="mr-2 h-4 w-4" />
                {formatWalletAddress(walletAddress)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 border-gray-700">
              <DropdownMenuItem className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" onClick={disconnectWallet}>
                <LogOut className="h-4 w-4" />
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={() => setRightPanelOpen(!rightPanelOpen)} className="md:hidden">
            <PanelRight className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={`w-60 border-r border-gray-800 flex-shrink-0 overflow-y-auto ${sidebarOpen ? "block" : "hidden"} md:block`}
        >
          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">Market Overview</h3>
              <MarketOverview />
            </div>

            <div>
              <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">Watchlist</h3>
              <WatchList currentSymbol={currentSymbol} onSelectSymbol={(symbol) => setCurrentSymbol(symbol)} />
            </div>
          </div>
        </aside>

        {/* Main Chart Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 min-h-0">
            <CryptoChart symbol={currentSymbol} timeframe={timeframe} />
          </div>

          <div className="h-48 border-t border-gray-800 overflow-y-auto">
            <Tabs defaultValue="indicators">
              <div className="border-b border-gray-800">
                <TabsList className="bg-transparent border-b-0">
                  <TabsTrigger value="indicators" className="data-[state=active]:bg-gray-800">
                    Indicators
                  </TabsTrigger>
                  <TabsTrigger value="drawings" className="data-[state=active]:bg-gray-800">
                    Drawings
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="indicators" className="p-4">
                <TechnicalIndicators />
              </TabsContent>
              <TabsContent value="drawings" className="p-4">
                <div className="grid grid-cols-4 gap-2">
                  <Button variant="outline" size="sm" className="border-gray-700">
                    Line
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-700">
                    Rectangle
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-700">
                    Fibonacci
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-700">
                    Pitchfork
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-700">
                    Trend Line
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-700">
                    Channel
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-700">
                    Ray
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-700">
                    Text
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* Right Panel */}
        <aside
          className={`w-72 border-l border-gray-800 flex-shrink-0 overflow-y-auto ${rightPanelOpen ? "block" : "hidden"} md:block`}
        >
          <Tabs defaultValue="orderbook">
            <div className="border-b border-gray-800">
              <TabsList className="bg-transparent border-b-0">
                <TabsTrigger value="orderbook" className="data-[state=active]:bg-gray-800">
                  Order Book
                </TabsTrigger>
                <TabsTrigger value="trades" className="data-[state=active]:bg-gray-800">
                  Trades
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="orderbook" className="p-0">
              <OrderBook symbol={currentSymbol} />
            </TabsContent>
            <TabsContent value="trades" className="p-0">
              <TradeHistory symbol={currentSymbol} />
            </TabsContent>
          </Tabs>
        </aside>
      </div>
    </div>
  )
}
