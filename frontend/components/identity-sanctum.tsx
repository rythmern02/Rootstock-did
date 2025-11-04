"use client"

import { Copy, Lock, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function IdentitySanctum() {
  const [copied, setCopied] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const did = "did:rsk:0x4a7b9c2e1f8d5a3b6c9e2f1a4d7b8c9e"

  const handleCopy = () => {
    navigator.clipboard.writeText(did)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="mb-16">
      <div className="arcane-card-bg border-2 border-white/40 p-10 relative group eldritch-pulse">
        {/* Mystical corner decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/60"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/60"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/60"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/60"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <Lock size={24} className="text-white forbidden-glow" />
            <h2 className="heading-arcane text-3xl off-white">Your Sovereign Identifier</h2>
          </div>

          <div className="relative mb-6">
            <div className="bg-black/60 border-2 border-white/30 p-8 backdrop-blur-sm relative group/did">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-0 group-hover/did:opacity-100 transition-opacity duration-300"></div>

              <div className="flex items-center gap-4 relative z-10">
                <code className="monospace-runes text-white flex-1 text-sm break-all font-bold tracking-wider">
                  {revealed
                    ? did
                    : did
                        .split("")
                        .map((_, i) => (i % 3 === 0 ? "●" : ""))
                        .join("")}
                </code>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setRevealed(!revealed)}
                    className="p-3 hover:bg-white/20 transition-all duration-300 rounded hover:arcane-purple-glow"
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
                    className="p-3 hover:bg-white/20 transition-all duration-300 rounded hover:arcane-purple-glow"
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
                  ✓ Copied to void
                </div>
              )}
            </div>

            {/* Mystical aura */}
            <div className="absolute -inset-2 bg-gradient-to-r from-white/20 via-transparent to-white/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>

          <div className="bg-white/10 border-l-4 border-white/60 p-4 mb-4">
            <p className="text-off-white/70 text-sm leading-relaxed">
              <span className="text-white font-bold">⚠ WARNING:</span> This is your unique decentralized identifier.
              Guard it as you would an ancient rune of power. Reveal only to those you trust in the shadows. Compromise
              of this identifier grants access to your entire mystical realm.
            </p>
          </div>

          {/* Mystical status indicators */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 border border-white/30 p-3 text-center">
              <div className="text-xs text-white/60 uppercase tracking-wider">Status</div>
              <div className="text-lg font-bold text-white mt-1">◆ Active ◆</div>
            </div>
            <div className="bg-white/10 border border-white/30 p-3 text-center">
              <div className="text-xs text-white/60 uppercase tracking-wider">Verification</div>
              <div className="text-lg font-bold text-white mt-1">✓ Verified</div>
            </div>
            <div className="bg-white/10 border border-white/30 p-3 text-center">
              <div className="text-xs text-white/60 uppercase tracking-wider">Power Level</div>
              <div className="text-lg font-bold text-white mt-1">∞ Infinite</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
