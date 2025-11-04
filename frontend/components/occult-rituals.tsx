"use client"

import { Wand2, Flame, Skull } from "lucide-react"
import { useState } from "react"
import ForbiddenRitualModal from "./forbidden-ritual-modal"

export default function OccultRituals() {
  const [activeRitual, setActiveRitual] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRitual, setSelectedRitual] = useState<string>("")

  const rituals = [
    {
      id: "summon",
      name: "Summon Credentials",
      description: "Invoke the ancient powers to manifest new credentials from the void",
      icon: Wand2,
      color: "arcane-purple",
    },
    {
      id: "burn",
      name: "Burn Revoked Tokens",
      description: "Purge corrupted credentials through the flames of purification",
      icon: Flame,
      color: "blood-red",
    },
    {
      id: "seal",
      name: "Seal the Sanctum",
      description: "Lock your identity vault with eldritch seals and forbidden wards",
      icon: Skull,
      color: "sickly-green",
    },
  ]

  const handleRitualClick = (ritualId: string, ritualName: string) => {
    setSelectedRitual(ritualName)
    setModalOpen(true)
  }

  return (
    <section className="mb-16">
      <h2 className="heading-arcane text-2xl off-white mb-8 forbidden-text">Forbidden Rituals</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rituals.map((ritual) => {
          const Icon = ritual.icon
          const isActive = activeRitual === ritual.id

          return (
            <button
              key={ritual.id}
              onClick={() => handleRitualClick(ritual.id, ritual.name)}
              className={`arcane-card-bg border-2 p-6 text-left transition-all duration-300 group relative overflow-hidden ${
                isActive
                  ? `border-white arcane-purple-glow`
                  : `border-white/30 hover:border-white/60`
              }`}
              style={{
                clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <Icon
                    size={28}
                    className={`text-white transition-all duration-300 ${isActive ? "scale-125 forbidden-glow" : ""}`}
                  />
                  <span className={`text-2xl ${isActive ? "animate-spin" : ""}`}>✦</span>
                </div>

                <h3 className="heading-arcane text-lg off-white mb-2">{ritual.name}</h3>
                <p className="text-off-white/60 text-sm leading-relaxed">{ritual.description}</p>

                {isActive && (
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-xs text-white/80 animate-pulse">
                      ◆ Ritual activated... channeling forbidden energies...
                    </div>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Modal */}
      <ForbiddenRitualModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        ritualName={selectedRitual}
      />
    </section>
  )
}
