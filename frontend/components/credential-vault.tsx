"use client"

import { useState } from "react"
import CredentialCard from "./credential-card"
import { Wand2 } from "lucide-react"

interface Credential {
  id: string
  title: string
  issuer: string
  status: "verified" | "pending" | "revoked"
  issuedDate: string
  power?: number
}

const mockCredentials: Credential[] = [
  {
    id: "1",
    title: "DAO Membership",
    issuer: "did:rsk:0x4a...b8e7",
    status: "verified",
    issuedDate: "2025-01-15",
    power: 85,
  },
  {
    id: "2",
    title: "Verified Developer Badge",
    issuer: "did:rsk:0x2f...c3d1",
    status: "verified",
    issuedDate: "2025-02-01",
    power: 92,
  },
  {
    id: "3",
    title: "Event Access: Arcane Con 2025",
    issuer: "did:rsk:0x8b...e9f2",
    status: "pending",
    issuedDate: "2025-03-10",
    power: 60,
  },
  {
    id: "4",
    title: "Legacy Credential",
    issuer: "did:rsk:0x5c...a1b4",
    status: "revoked",
    issuedDate: "2024-12-01",
    power: 0,
  },
]

export default function CredentialVault() {
  const [credentials] = useState<Credential[]>(mockCredentials)
  const [filter, setFilter] = useState<"all" | "verified" | "pending" | "revoked">("all")

  const filteredCredentials = credentials.filter((c) => filter === "all" || c.status === filter)

  return (
    <section>
      <div className="flex items-center justify-between mb-8 relative">
        <div>
          <h2 className="heading-arcane text-3xl off-white forbidden-text">Credential Vault</h2>
          <p className="text-white/60 text-sm mt-2">
            {filteredCredentials.length} credential{filteredCredentials.length !== 1 ? "s" : ""} in the sanctum
          </p>
        </div>

        <button
          className="arcane-purple-bg off-white px-8 py-4 font-semibold hover:arcane-purple-glow transition-all duration-300 flex items-center gap-3 group relative"
          style={{
            clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
          }}
        >
          <Wand2 size={20} className="group-hover:rotate-12 transition-transform duration-300" />
          <span>Invoke New Credential</span>
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            }}
          ></div>
        </button>
      </div>

      <div className="flex gap-3 mb-8 flex-wrap">
        {(["all", "verified", "pending", "revoked"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
              filter === status
                ? "arcane-purple-bg off-white arcane-purple-glow"
                : "border border-white/30 text-white/70 hover:border-white/60 hover:text-white"
            }`}
            style={{
              clipPath: "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))",
            }}
          >
            {status === "all" ? "All Credentials" : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCredentials.map((credential) => (
          <CredentialCard key={credential.id} credential={credential} />
        ))}
      </div>

      {filteredCredentials.length === 0 && (
        <div className="text-center py-16 arcane-card-bg border-2 border-white/20">
          <Wand2 size={48} className="mx-auto text-white/40 mb-4" />
          <p className="text-off-white/60 text-lg">No credentials found in this realm</p>
          <p className="text-white/40 text-sm mt-2">Invoke new credentials to populate the vault</p>
        </div>
      )}
    </section>
  )
}
