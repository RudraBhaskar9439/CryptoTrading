"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Wallet } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState("")

  const connectWallet = async () => {
    setIsConnecting(true)
    setError("")

    try {
      // Check if MetaMask is installed
      if (typeof window !== "undefined" && typeof window.ethereum === "undefined") {
        throw new Error("MetaMask is not installed. Please install MetaMask to continue.")
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (accounts.length > 0) {
        // Successfully connected
        console.log("Connected with:", accounts[0])

        // Redirect to dashboard after successful connection
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      }
    } catch (err: any) {
      console.error("Error connecting wallet:", err)
      setError(err.message || "Failed to connect wallet. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="border-b border-gray-800 py-4 px-6">
        <div className="container mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
            <CardDescription>Connect your cryptocurrency wallet to access the trading platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-4 text-sm text-gray-400">
                <p>By connecting your wallet, you agree to our Terms of Service and Privacy Policy.</p>
              </div>

              {error && (
                <div className="bg-red-900/30 border border-red-800 text-red-400 rounded-lg p-4 text-sm">{error}</div>
              )}

              <Button
                onClick={connectWallet}
                disabled={isConnecting}
                className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
              >
                {isConnecting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Connecting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Connect Wallet
                  </span>
                )}
              </Button>

              <div className="text-center text-sm text-gray-500">
                <p>Don&apos;t have a wallet?</p>
                <Link
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400"
                >
                  Get MetaMask
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
