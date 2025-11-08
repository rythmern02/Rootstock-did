"use client"

import { useState, useEffect } from "react"
import { User, Mail, Shield, Upload } from "lucide-react"
import { useSetIdentity } from "@/hooks/useDidContract"
import { uploadIdentityToIPFS } from "@/utils/ipfs"
import { useAccount } from "wagmi"

export default function MintDIDForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePicture: null as File | null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { address } = useAccount()
  const { setIdentity, isPending, wait, error: contractError } = useSetIdentity()

  // Update success state when transaction is confirmed
  useEffect(() => {
    if (wait?.isSuccess) {
      setSuccess(true)
      setIsSubmitting(false)
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        profilePicture: null
      })
      alert("Your DID has been successfully minted on the blockchain!")
    }
    if (wait?.isError || contractError) {
      setError(contractError?.message || "Transaction failed")
      setIsSubmitting(false)
    }
  }, [wait?.isSuccess, wait?.isError, contractError])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setError(null)
    setSuccess(false)
    setIsSubmitting(true)

    try {
      // Check if wallet is connected
      if (!address) {
        throw new Error("Please connect your wallet first")
      }

      // Check if Pinata JWT is configured
      if (!process.env.NEXT_PUBLIC_PINATA_JWT) {
        throw new Error("IPFS service not configured. Please set NEXT_PUBLIC_PINATA_JWT environment variable.")
      }

      // Step 1: Upload image and metadata to IPFS
      const metadataHash = await uploadIdentityToIPFS(
        formData.name,
        formData.email,
        formData.profilePicture
      )

      // Step 2: Set identity on contract with IPFS hash
      setIdentity(`ipfs://${metadataHash}`)

      // Note: Transaction confirmation is handled by the wait hook via useEffect
      // The success state will be updated when the transaction is confirmed
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(errorMessage)
      console.error("Error minting DID:", err)
      alert(`Error: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="max-w-2xl mx-auto">
      <div className="arcane-card-bg border-2 border-white/40 p-8 relative group">
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/60"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/60"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/60"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/60"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Shield size={24} className="text-white" />
            <h2 className="heading-arcane text-3xl off-white">Mint Your Decentralized Identity</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-off-white font-semibold">
                <User size={16} className="text-white" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full bg-black/60 border-2 border-white/30 p-4 text-off-white placeholder-white/40 focus:border-white transition-all duration-300"
                required
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-off-white font-semibold">
                <Mail size={16} className="text-white" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="w-full bg-black/60 border-2 border-white/30 p-4 text-off-white placeholder-white/40 focus:border-white transition-all duration-300"
                required
              />
            </div>

            {/* Profile Picture Upload */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-off-white font-semibold">
                <Upload size={16} className="text-white" />
                Profile Picture (Optional)
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
                  className="block w-full bg-black/60 border-2 border-white/30 p-4 text-center cursor-pointer hover:border-white transition-all duration-300"
                >
                  {formData.profilePicture ? (
                    <div className="flex items-center gap-2 text-white justify-center">
                      <Upload size={16} />
                      <span>{formData.profilePicture.name}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-white/60 justify-center">
                      <Upload size={16} />
                      <span>Upload your profile picture</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-500/20 border-2 border-red-500/50 p-4 text-red-200">
                <p className="font-semibold">Error:</p>
                <p>{error}</p>
              </div>
            )}

            {/* Success Display */}
            {success && (
              <div className="bg-green-500/20 border-2 border-green-500/50 p-4 text-green-200">
                <p className="font-semibold">Success!</p>
                <p>Your DID has been successfully minted on the blockchain.</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting || isPending || !address}
                className="w-full arcane-purple-bg off-white py-4 px-6 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                }}
              >
                {isSubmitting || isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-off-white/30 border-t-off-white rounded-full animate-spin"></div>
                    <span>{isSubmitting ? "Uploading to IPFS..." : "Confirming transaction..."}</span>
                  </div>
                ) : !address ? (
                  "Connect Wallet to Mint"
                ) : (
                  "Mint DID"
                )}
              </button>
            </div>
          </form>

          {/* Info */}
          <div className="bg-white/10 border-l-4 border-white/60 p-4 mt-6">
            <p className="text-off-white/70 text-sm leading-relaxed">
              <span className="text-white font-bold">ℹ INFO:</span> Your Decentralized Identity (DID) will be permanently recorded on the Rootstock blockchain. 
              Once minted, this identity will be immutable and verifiable by anyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

