"use client"

import { useState } from "react"
import { Share2, CheckCircle2, AlertCircle, Lock, Zap } from "lucide-react"

interface CredentialCardProps {
  credential: {
    id: string
    title: string
    issuer: string
    status: "verified" | "pending" | "revoked"
    issuedDate: string
    power?: number
  }
}

export default function CredentialCard({ credential }: CredentialCardProps) {
  const [showShare, setShowShare] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const statusConfig = {
    verified: {
      icon: CheckCircle2,
      color: "text-white",
      label: "Verified",
      bgColor: "bg-white/10",
      borderColor: "border-white/40",
      glowClass: "arcane-purple-glow",
    },
    pending: {
      icon: AlertCircle,
      color: "text-white",
      label: "Pending",
      bgColor: "bg-white/10",
      borderColor: "border-white/40",
      glowClass: "",
    },
    revoked: {
      icon: Lock,
      color: "text-white",
      label: "Revoked",
      bgColor: "bg-white/10",
      borderColor: "border-white/40",
      glowClass: "arcane-purple-glow",
    },
  }

  const config = statusConfig[credential.status]
  const StatusIcon = config.icon

  return (
    <div
      className={`arcane-card-bg border-2 p-6 transition-all duration-300 group relative overflow-hidden ${
        config.borderColor
      } ${isHovered ? config.glowClass : ""}`}
      style={{
        clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Mystical corner accent */}
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-white/30 group-hover:border-white/60 transition-colors duration-300"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="heading-arcane text-lg off-white flex-1 pr-4">{credential.title}</h3>
          {credential.power !== undefined && credential.status === "verified" && (
            <div className="flex items-center gap-1 text-white text-sm font-bold whitespace-nowrap">
              <Zap size={16} className="animate-pulse" />
              {credential.power}
            </div>
          )}
        </div>

        {/* Issuer */}
        <div className="mb-4">
          <p className="text-off-white/50 text-xs uppercase tracking-wider">Issued by</p>
          <p className="monospace-runes text-white text-sm mt-1 font-bold">{credential.issuer}</p>
        </div>

        {/* Status Badge */}
        <div
          className={`flex items-center gap-2 ${config.bgColor} ${config.borderColor} border w-fit px-4 py-2 mb-4 transition-all duration-300 group-hover:${config.glowClass}`}
        >
          <StatusIcon size={16} className={config.color} />
          <span className={`text-sm font-semibold ${config.color}`}>{config.label}</span>
        </div>

        {/* Share Button - appears on hover */}
        <button
          onClick={() => setShowShare(!showShare)}
          className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/20 rounded hover:arcane-purple-glow"
        >
          <Share2 size={18} className="text-white" />
        </button>

        {/* Share Proof Button */}
        {showShare && (
          <button className="w-full mt-4 border-2 border-white/50 text-white py-3 px-4 text-sm font-semibold hover:bg-white/10 transition-all duration-300 hover:border-white hover:arcane-purple-glow">
            ✦ Share Proof to Void ✦
          </button>
        )}

        {/* Issued Date */}
        <p className="text-off-white/40 text-xs mt-4">
          Inscribed: {new Date(credential.issuedDate).toLocaleDateString()}
        </p>

        {/* Mystical divider */}
        <div className="mt-4 pt-4 border-t border-white/10 flex justify-center">
          <span className="text-white/30 text-xs">◆ ◆ ◆</span>
        </div>
      </div>
    </div>
  )
}
