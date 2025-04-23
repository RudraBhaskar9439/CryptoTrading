import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold">
              CT
            </div>
            <span className="text-xl font-bold">CryptoTrade</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Community
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Support
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700">Connect Wallet</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Advanced Crypto <span className="text-blue-500">Trading</span> Platform
                </h1>
                <p className="text-xl text-gray-400">
                  Professional-grade technical analysis tools for cryptocurrency traders. Connect your wallet and start
                  trading smarter.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/login">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Start Trading
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                      Explore Features
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute -inset-1 bg-blue-500/20 rounded-lg blur-xl"></div>
                  <div className="relative bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="Trading platform preview"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 px-6 bg-gray-900">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Trading Features</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Our platform offers professional-grade tools for cryptocurrency analysis and trading
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Advanced Charts</h3>
                <p className="text-gray-400">
                  Interactive candlestick charts with multiple timeframes and drawing tools
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Technical Indicators</h3>
                <p className="text-gray-400">
                  Over 100+ technical indicators including MACD, RSI, Bollinger Bands, and more
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Wallet Integration</h3>
                <p className="text-gray-400">Secure wallet connection for authentication and seamless trading</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-gray-800 py-8 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold">
                CT
              </div>
              <span className="text-xl font-bold">CryptoTrade</span>
            </div>
            <div className="text-gray-500 text-sm">© 2023 CryptoTrade. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
