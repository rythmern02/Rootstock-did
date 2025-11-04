"use client"

import { useState } from "react"
import { Copy, Eye, EyeOff, Lock, CheckCircle2, Calendar } from "lucide-react"

export default function MyDIDView() {
  const [copied, setCopied] = useState(false)
  const [revealed, setRevealed] = useState(false)
  
  const didData = {
    did: "did:rsk:0x4a7b9c2e1f8d5a3b6c9e2f1a4d7b8c9e",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "Active",
    verified: true,
    mintedDate: "2025-01-15",
    blockchain: "Rootstock",
    network: "Mainnet"
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(didData.did)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="max-w-3xl mx-auto">
      <div className="arcane-card-bg border-2 border-white/40 p-10 relative group">
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/60"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/60"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/60"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/60"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Lock size={24} className="text-white" />
            <h2 className="heading-arcane text-3xl off-white">Your Decentralized Identity</h2>
          </div>

          {/* DID Display */}
          <div className="mb-8">
            <div className="bg-black/60 border-2 border-white/30 p-8 relative group/did">
              <div className="flex items-center gap-4 relative z-10">
                <code className="monospace-runes text-white flex-1 text-sm break-all font-bold tracking-wider">
                  {revealed ? didData.did : "did:rsk:●●●●●●●●●●●●●●●●●●●●●●●"}
                </code>

                <div className="flex gap-2">
                  <button
                    onClick={() => setRevealed(!revealed)}
                    className="p-3 hover:bg-white/20 transition-all duration-300 rounded"
                    title={revealed ? "Hide DID" : "Reveal DID"}
                  >
                    {revealed ? (
                      <EyeOff size={20} className="text-white" />
                    ) : (
                      <Eye size={20} className="text-white/60" />
                    )}
                  </button>

                  <button
                    onClick={handleCopy}
                    className="p-3 hover:bg-white/20 transition-all duration-300 rounded"
                    title="Copy DID"
                  >
                    <Copy
                      size={20}
                      className={`transition-all duration-300 ${copied ? "text-white scale-110" : "text-white"}`}
                    />
                  </button>
                </div>
              </div>

              {copied && (
                <div className="absolute top-2 right-2 text-white text-xs font-semibold animate-pulse">
                  ✓ Copied
                </div>
              )}
            </div>
          </div>

          {/* DID Details */}
          <div className="space-y-4 mb-6">
            <div className="bg-white/10 border border-white/30 p-4">
              <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Full Name</div>
              <div className="text-lg font-bold text-white">{didData.name}</div>
            </div>

            <div className="bg-white/10 border border-white/30 p-4">
              <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Email</div>
              <div className="text-lg font-bold text-white">{didData.email}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 border border-white/30 p-4">
                <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Status</div>
                <div className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={20} />
                  {didData.status}
                </div>
              </div>

              <div className="bg-white/10 border border-white/30 p-4">
                <div className="text-xs text-white/60 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <Calendar size={16} />
                  Minted Date
                </div>
                <div className="text-lg font-bold text-white">{new Date(didData.mintedDate).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 border border-white/30 p-4">
                <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Blockchain</div>
                <div className="text-lg font-bold text-white">{didData.blockchain}</div>
              </div>

              <div className="bg-white/10 border border-white/30 p-4">
                <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Network</div>
                <div className="text-lg font-bold text-white">{didData.network}</div>
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="bg-white/10 border border-white/30 p-4 flex items-center gap-3">
            <div className={`text-white flex items-center gap-2 ${didData.verified ? "" : "opacity-50"}`}>
              {didData.verified ? (
                <>
                  <CheckCircle2 size={24} />
                  <span className="font-bold">Verified Identity</span>
                </>
              ) : (
                <>
                  <Lock size={24} />
                  <span className="font-bold">Unverified Identity</span>
                </>
              )}
            </div>
          </div>

          {/* Warning */}
          <div className="bg-white/10 border-l-4 border-white/60 p-4 mt-6">
            <p className="text-off-white/70 text-sm leading-relaxed">
              <span className="text-white font-bold">⚠ WARNING:</span> Your DID is permanently stored on the blockchain. 
              Keep your private keys secure and never share them with anyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

