"use client"

import { useState } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import MintDIDForm from "@/components/mint-did-form"
import MyDIDView from "@/components/my-did-view"

export default function Home() {
  const [activeView, setActiveView] = useState<"mint" | "my-did">("mint")
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending: isConnecting } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div className="arcane-bg min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-40 right-20 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/4 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <header className="border-b border-white/30 py-8 relative z-20">
        <div className="container mx-auto px-4">
          <h1 className="heading-arcane text-5xl off-white tracking-widest text-center mb-8">
            Rootstock DID
          </h1>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => setActiveView("mint")}
              className={`px-8 py-4 font-semibold transition-all duration-300 ${
                activeView === "mint"
                  ? "arcane-purple-bg off-white"
                  : "border-2 border-white/60 off-white hover:border-white"
              }`}
              style={{
                clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}
            >
              Mint Your DID
            </button>
            <button
              onClick={() => setActiveView("my-did")}
              className={`px-8 py-4 font-semibold transition-all duration-300 ${
                activeView === "my-did"
                  ? "arcane-purple-bg off-white"
                  : "border-2 border-white/60 off-white hover:border-white"
              }`}
              style={{
                clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}
            >
              My DID
            </button>
            {!isConnected ? (
              <button
                onClick={() => {
                  const injectedConnector = connectors.find((c) => c.id === "injected" || c.type === "injected")
                  if (injectedConnector) {
                    connect({ connector: injectedConnector })
                  } else if (connectors.length > 0) {
                    connect({ connector: connectors[0] })
                  }
                }}
                disabled={isConnecting}
                className="px-8 py-4 font-semibold transition-all duration-300 border-2 border-white/60 off-white hover:border-white disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                }}
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-black/60 border-2 border-white/30 text-sm off-white">
                  <span className="text-white/60">Wallet: </span>
                  <span className="font-mono">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                </div>
                <button
                  onClick={() => disconnect()}
                  className="px-6 py-2 font-semibold transition-all duration-300 border-2 border-white/60 off-white hover:border-white text-sm"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                  }}
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {activeView === "mint" ? <MintDIDForm /> : <MyDIDView />}
      </main>
    </div>
  )
}
