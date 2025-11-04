"use client"

import { useState } from "react"
import { X, Upload, User, Mail, Calendar, Shield, Eye, EyeOff } from "lucide-react"

interface ForbiddenRitualModalProps {
  isOpen: boolean
  onClose: () => void
  ritualName: string
}

export default function ForbiddenRitualModal({ isOpen, onClose, ritualName }: ForbiddenRitualModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthDate: "",
    profilePicture: null as File | null,
    description: "",
    powerLevel: "1",
    showSensitiveData: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate ritual invocation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log("Ritual invoked:", { ritualName, formData })
    setIsSubmitting(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="arcane-card-bg border-2 border-white/40 p-8 relative group eldritch-pulse">
          {/* Mystical corner decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/60"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/60"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/60"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/60"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 transition-all duration-300 rounded hover:arcane-purple-glow"
          >
            <X size={20} className="text-white" />
          </button>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <Shield size={24} className="text-white forbidden-glow" />
              <div>
                <h2 className="heading-arcane text-3xl off-white">{ritualName}</h2>
                <p className="text-white/60 text-sm mt-1">
                  Invoke the ancient powers to manifest a new identity
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-off-white font-semibold">
                  <User size={16} className="text-white" />
                  Identity Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your mystical identity name"
                  className="w-full bg-black/60 border-2 border-white/30 p-4 text-off-white placeholder-white/40 focus:border-white focus:arcane-purple-glow transition-all duration-300"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-off-white font-semibold">
                  <Mail size={16} className="text-white" />
                  Contact Sigil
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.sigil@realm.com"
                  className="w-full bg-black/60 border-2 border-white/30 p-4 text-off-white placeholder-white/40 focus:border-white focus:arcane-purple-glow transition-all duration-300"
                  required
                />
              </div>

              {/* Birth Date Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-off-white font-semibold">
                  <Calendar size={16} className="text-white" />
                  Birth of Power
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="w-full bg-black/60 border-2 border-white/30 p-4 text-off-white focus:border-white focus:arcane-purple-glow transition-all duration-300"
                  required
                />
              </div>

              {/* Profile Picture Upload */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-off-white font-semibold">
                  <Upload size={16} className="text-white" />
                  Mystical Portrait
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="profile-picture"
                  />
                  <label
                    htmlFor="profile-picture"
                    className="block w-full bg-black/60 border-2 border-white/30 p-4 text-center cursor-pointer hover:border-white hover:arcane-purple-glow transition-all duration-300"
                  >
                    {formData.profilePicture ? (
                      <div className="flex items-center gap-2 text-white">
                        <Upload size={16} />
                        <span>{formData.profilePicture.name}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-white/60">
                        <Upload size={16} />
                        <span>Upload your mystical portrait</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Power Level */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-off-white font-semibold">
                  <Shield size={16} className="text-white" />
                  Power Level
                </label>
                <select
                  name="powerLevel"
                  value={formData.powerLevel}
                  onChange={handleInputChange}
                  className="w-full bg-black/60 border-2 border-white/30 p-4 text-off-white focus:border-white focus:arcane-purple-glow transition-all duration-300"
                >
                  <option value="1">Initiate (Level 1)</option>
                  <option value="2">Acolyte (Level 2)</option>
                  <option value="3">Adept (Level 3)</option>
                  <option value="4">Master (Level 4)</option>
                  <option value="5">Archmage (Level 5)</option>
                </select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-off-white font-semibold">
                  <Eye size={16} className="text-white" />
                  Mystical Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your mystical powers and abilities..."
                  rows={4}
                  className="w-full bg-black/60 border-2 border-white/30 p-4 text-off-white placeholder-white/40 focus:border-white focus:arcane-purple-glow transition-all duration-300 resize-none"
                />
              </div>

              {/* Sensitive Data Toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, showSensitiveData: !prev.showSensitiveData }))}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  {formData.showSensitiveData ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span className="text-sm">
                    {formData.showSensitiveData ? "Hide" : "Show"} Sensitive Data
                  </span>
                </button>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 border-2 border-white/50 text-white py-4 px-6 font-semibold hover:bg-white/10 transition-all duration-300 hover:border-white hover:arcane-purple-glow"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                  }}
                >
                  Cancel Ritual
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 arcane-purple-bg off-white py-4 px-6 font-semibold hover:arcane-purple-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                  }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-off-white/30 border-t-off-white rounded-full animate-spin"></div>
                      <span>Invoking...</span>
                    </div>
                  ) : (
                    "Invoke Ritual"
                  )}
                </button>
              </div>
            </form>

            {/* Warning */}
            <div className="bg-white/10 border-l-4 border-white/60 p-4 mt-6">
              <p className="text-off-white/70 text-sm leading-relaxed">
                <span className="text-white font-bold">⚠ WARNING:</span> This ritual will create a new mystical identity. 
                Ensure all information is accurate as it cannot be easily modified once the ritual is complete. 
                The ancient powers are unforgiving of mistakes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
