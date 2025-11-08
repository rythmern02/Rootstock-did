"use client"

import { useState, useEffect } from "react"
import { Copy, Eye, EyeOff, Lock, CheckCircle2, Calendar, Loader2 } from "lucide-react"
import { useAccount } from "wagmi"
import { useGetIdentity, useGetIdentityMetadata } from "@/hooks/useDidContract"
import { fetchMetadataFromIPFS } from "@/utils/ipfs"

interface DIDMetadata {
  name: string
  email: string
  image?: string
  description?: string
  createdAt?: string
}

export default function MyDIDView() {
  const [copied, setCopied] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [metadata, setMetadata] = useState<DIDMetadata | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { address } = useAccount()
  // First check if identity exists using simpler getIdentity function
  const { data: identityDocument, isLoading: isLoadingDocument, error: documentError } = useGetIdentity(address)
  // Then get full metadata if document exists
  const { data: identityData, isLoading: isLoadingIdentity, error: identityError } = useGetIdentityMetadata(address)

  // Debug loggings
  useEffect(() => {
    if (address) {
      console.log("MyDIDView - Address:", address)
      console.log("MyDIDView - Document:", identityDocument)
      console.log("MyDIDView - Document Error:", documentError)
      console.log("MyDIDView - Identity Data:", identityData)
      console.log("MyDIDView - Identity Error:", identityError)
      console.log("MyDIDView - Loading Document:", isLoadingDocument)
      console.log("MyDIDView - Loading Identity:", isLoadingIdentity)
    }
  }, [address, identityDocument, documentError, identityData, identityError, isLoadingDocument, isLoadingIdentity])

  // Fetch metadata from IPFS when identity data is available
  useEffect(() => {
    const loadMetadata = async () => {
      if (!address) {
        setLoading(false)
        return
      }

      // If still loading document, wait
      if (isLoadingDocument) {
        return
      }

      // Check if document exists first
      // Note: documentError might be set even if the call succeeds but returns empty string
      // So we check the actual document value first
      const docValue = typeof identityDocument === "string" ? identityDocument : ""
      if (!docValue || docValue === "" || docValue === "0x") {
        // Only show error if we actually got an error, not just empty result
        if (documentError && !isLoadingDocument) {
          console.error("Document error:", documentError)
          setError("Failed to fetch identity. Please check your connection and try again.")
        } else {
          setError("No identity found for this address")
        }
        setLoading(false)
        return
      }

      // If we have a document, clear any previous errors
      if (docValue && docValue !== "" && docValue !== "0x") {
        setError(null)
      }

      // If still loading metadata, wait
      if (isLoadingIdentity) {
        return
      }

      // Handle contract errors for metadata
      // If metadata call fails but we have a document, use the document to fetch from IPFS
      if (identityError && docValue && docValue !== "" && docValue !== "0x") {
        console.warn("Metadata call failed, but document exists. Fetching from IPFS:", docValue)
        try {
          setLoading(true)
          setError(null)
          const fetchedMetadata = await fetchMetadataFromIPFS(docValue)
          setMetadata(fetchedMetadata)
          setLoading(false)
          return
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : "Failed to load metadata from IPFS"
          console.error("IPFS fetch error:", err)
          setError(errorMessage)
          setLoading(false)
          return
        }
      }

      // If no metadata data, try to fetch from document
      if (!identityData) {
        if (docValue && docValue !== "" && docValue !== "0x") {
          try {
            setLoading(true)
            setError(null)
            const fetchedMetadata = await fetchMetadataFromIPFS(docValue)
            setMetadata(fetchedMetadata)
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to load metadata"
            setError(errorMessage)
            console.error("Error fetching metadata:", err)
          } finally {
            setLoading(false)
          }
        }
        return
      }

      // Type guard for identityData
      const identityDataTyped = identityData as { document?: string; updatedAt?: bigint; version?: bigint; lastUpdater?: string } | null
      const document = identityDataTyped?.document || docValue
      if (!document || document === "" || document === "0x") {
        setError("No identity found for this address")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const fetchedMetadata = await fetchMetadataFromIPFS(document)
        setMetadata(fetchedMetadata)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load metadata"
        setError(errorMessage)
        console.error("Error fetching metadata:", err)
      } finally {
        setLoading(false)
      }
    }

    loadMetadata()
  }, [identityData, identityDocument, address, identityError, documentError, isLoadingIdentity, isLoadingDocument])

  const didAddress = address ? `did:rsk:${address}` : "Not connected"

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(didAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Format timestamp from contract
  const formatDate = (timestamp: bigint | undefined) => {
    if (!timestamp) return "N/A"
    return new Date(Number(timestamp) * 1000).toLocaleDateString()
  }

  // Show loading state
  if (!address) {
    return (
      <section className="max-w-3xl mx-auto">
        <div className="arcane-card-bg border-2 border-white/40 p-10 relative group">
          <div className="relative z-10 text-center">
            <Lock size={48} className="text-white/60 mx-auto mb-4" />
            <h2 className="heading-arcane text-2xl off-white mb-4">Connect Your Wallet</h2>
            <p className="text-off-white/70">Please connect your wallet to view your DID</p>
          </div>
        </div>
      </section>
    )
  }

  if (isLoadingDocument || isLoadingIdentity || loading) {
    return (
      <section className="max-w-3xl mx-auto">
        <div className="arcane-card-bg border-2 border-white/40 p-10 relative group">
          <div className="relative z-10 text-center">
            <Loader2 size={48} className="text-white mx-auto mb-4 animate-spin" />
            <h2 className="heading-arcane text-2xl off-white mb-4">Loading Your DID...</h2>
            <p className="text-off-white/70">Fetching identity from blockchain</p>
          </div>
        </div>
      </section>
    )
  }

  // Show error state if there's an error or no identity data
  // Only show error if we're not loading and have confirmed there's no document
  const docValueCheck = typeof identityDocument === "string" ? identityDocument : ""
  const hasNoIdentity = !isLoadingDocument && !isLoadingIdentity && 
    (!docValueCheck || docValueCheck === "" || docValueCheck === "0x") &&
    !identityData

  if (error || (hasNoIdentity && !docValueCheck)) {
    return (
      <section className="max-w-3xl mx-auto">
        <div className="arcane-card-bg border-2 border-white/40 p-10 relative group">
          <div className="relative z-10">
            <div className="bg-white/10 border-2 border-white/30 p-6 text-center">
              <Lock size={48} className="text-white/60 mx-auto mb-4" />
              <h2 className="heading-arcane text-2xl off-white mb-4">No Identity Found</h2>
              <p className="text-off-white/70 mb-6">
                {error || "You haven't minted a DID yet. Go to the Mint tab to create your decentralized identity."}
              </p>
              {(documentError || identityError) && (
                <div className="mt-4 p-3 bg-white/5 border border-white/20 rounded text-xs text-white/60">
                  <p>Debug: {documentError?.message || identityError?.message}</p>
                  <p>Address: {address}</p>
                  <p>Document: {typeof identityDocument === "string" ? identityDocument : "None"}</p>
                </div>
              )}
              <button
                onClick={() => window.location.hash = "#mint"}
                className="px-6 py-3 font-semibold transition-all duration-300 border-2 border-white/60 off-white hover:border-white"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                }}
              >
                Go to Mint Tab
              </button>
            </div>
          </div>
        </div>
      </section>
    )
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
                  {revealed ? didAddress : "did:rsk:●●●●●●●●●●●●●●●●●●●●●●●"}
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

          {/* Profile Image */}
          {metadata?.image && (
            <div className="mb-6 flex justify-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30">
                <img
                  src={metadata.image.replace(/^ipfs:\/\//, "https://gateway.pinata.cloud/ipfs/")}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to other gateways if Pinata fails
                    const img = e.target as HTMLImageElement
                    const hash = metadata.image!.replace(/^ipfs:\/\//, "")
                    img.src = `https://ipfs.io/ipfs/${hash}`
                  }}
                />
              </div>
            </div>
          )}

          {/* DID Details */}
          <div className="space-y-4 mb-6">
            <div className="bg-white/10 border border-white/30 p-4">
              <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Full Name</div>
              <div className="text-lg font-bold text-white">{metadata?.name || "N/A"}</div>
            </div>

            <div className="bg-white/10 border border-white/30 p-4">
              <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Email</div>
              <div className="text-lg font-bold text-white">{metadata?.email || "N/A"}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 border border-white/30 p-4">
                <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Status</div>
                <div className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={20} />
                  Active
                </div>
              </div>

              <div className="bg-white/10 border border-white/30 p-4">
                <div className="text-xs text-white/60 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <Calendar size={16} />
                  Updated At
                </div>
                <div className="text-lg font-bold text-white">{formatDate((identityData as { updatedAt?: bigint })?.updatedAt)}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 border border-white/30 p-4">
                <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Version</div>
                <div className="text-lg font-bold text-white">{((identityData as { version?: bigint })?.version)?.toString() || "0"}</div>
              </div>

              <div className="bg-white/10 border border-white/30 p-4">
                <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Blockchain</div>
                <div className="text-lg font-bold text-white">Rootstock</div>
              </div>
            </div>

            {metadata?.createdAt && (
              <div className="bg-white/10 border border-white/30 p-4">
                <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Created At</div>
                <div className="text-lg font-bold text-white">{new Date(metadata.createdAt).toLocaleDateString()}</div>
              </div>
            )}
          </div>

          {/* Verification Badge */}
          <div className="bg-white/10 border border-white/30 p-4 flex items-center gap-3">
            <div className="text-white flex items-center gap-2">
              <CheckCircle2 size={24} />
              <span className="font-bold">Verified Identity</span>
            </div>
          </div>

          {/* IPFS Hash */}
          <div className="bg-white/10 border border-white/30 p-4 mt-4">
            <div className="text-xs text-white/60 uppercase tracking-wider mb-1">IPFS Hash</div>
            <code className="text-sm text-white break-all">{(identityData as { document?: string })?.document || docValueCheck || "N/A"}</code>
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

