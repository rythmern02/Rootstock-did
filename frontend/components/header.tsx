"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function Header() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [showAddress, setShowAddress] = useState(false)

  const handleConnect = () => {
    setIsConnected(true)
    setWalletAddress("0x" + Math.random().toString(16).slice(2, 10).toUpperCase())
  }

  return (
    <header className="arcane-bg border-b border-white/30 py-8 relative z-20">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <div className="relative inline-block">
              <h1 className="heading-arcane text-5xl off-white tracking-widest void-flicker">◆ Rootstock Identity ◆</h1>
              <div className="absolute -inset-4 bg-gradient-to-r from-white/20 via-transparent to-white/20 blur-xl -z-10"></div>
            </div>
            <p className="text-white text-sm mt-3 forbidden-text">
              The Identity Sanctum of Forbidden Knowledge
            </p>
          </div>

          <div
            onClick={handleConnect}
            className={`px-8 py-4 font-semibold transition-all duration-300 relative group ${
              isConnected
                ? "arcane-purple-bg off-white eldritch-pulse"
                : "border-2 border-white/60 off-white hover:border-white hover:arcane-purple-glow-hover"
            }`}
            style={{
              clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              {isConnected ? (
                <>
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  <span className="text-xs">{showAddress ? walletAddress : "●●●●●●●●"}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowAddress(!showAddress)
                    }}
                    className="ml-2 hover:text-white transition-colors"
                  >
                    {showAddress ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </>
              ) : (
                "Summon Wallet"
              )}
            </span>
            {!isConnected && (
              <div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                }}
              ></div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 text-white/40 text-sm">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/20"></div>
          <span className="rune-rotate">✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/20"></div>
        </div>
      </div>
    </header>
  )
}
