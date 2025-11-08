/**
 * IPFS Upload Utility
 * Uploads images and metadata to IPFS using Pinata
 */

const PINATA_API_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS"
const PINATA_JSON_URL = "https://api.pinata.cloud/pinning/pinJSONToIPFS"

interface UploadImageResponse {
  IpfsHash: string
  PinSize: number
  Timestamp: string
}

interface UploadMetadataResponse {
  IpfsHash: string
  PinSize: number
  Timestamp: string
}

/**
 * Upload a file (image) to IPFS
 */
export async function uploadImageToIPFS(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)

  // Add metadata for Pinata
  const pinataMetadata = JSON.stringify({
    name: file.name,
  })
  formData.append("pinataMetadata", pinataMetadata)

  // Add options for Pinata
  const pinataOptions = JSON.stringify({
    cidVersion: 1,
  })
  formData.append("pinataOptions", pinataOptions)

  const response = await fetch(PINATA_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT || ""}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to upload image to IPFS: ${error}`)
  }

  const data: UploadImageResponse = await response.json()
  return data.IpfsHash
}

/**
 * Upload metadata JSON to IPFS
 */
export async function uploadMetadataToIPFS(metadata: {
  name: string
  email: string
  image?: string
  description?: string
}): Promise<string> {
  const metadataJSON = {
    name: metadata.name,
    email: metadata.email,
    ...(metadata.image && { image: `ipfs://${metadata.image}` }),
    ...(metadata.description && { description: metadata.description }),
    createdAt: new Date().toISOString(),
  }

  const response = await fetch(PINATA_JSON_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT || ""}`,
    },
    body: JSON.stringify({
      pinataContent: metadataJSON,
      pinataMetadata: {
        name: "DID-Metadata",
      },
      pinataOptions: {
        cidVersion: 1,
      },
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to upload metadata to IPFS: ${error}`)
  }

  const data: UploadMetadataResponse = await response.json()
  return data.IpfsHash
}

/**
 * Upload image and metadata to IPFS, returns metadata hash
 */
export async function uploadIdentityToIPFS(
  name: string,
  email: string,
  imageFile: File | null
): Promise<string> {
  let imageHash: string | undefined

  // Upload image if provided
  if (imageFile) {
    imageHash = await uploadImageToIPFS(imageFile)
  }

  // Upload metadata with image hash
  const metadataHash = await uploadMetadataToIPFS({
    name,
    email,
    image: imageHash,
    description: "Decentralized Identity Document",
  })

  return metadataHash
}

/**
 * Fetch metadata from IPFS using IPFS gateway
 */
export async function fetchMetadataFromIPFS(ipfsHash: string): Promise<{
  name: string
  email: string
  image?: string
  description?: string
  createdAt?: string
}> {
  // Remove ipfs:// prefix if present
  const hash = ipfsHash.replace(/^ipfs:\/\//, "")
  
  // Try multiple IPFS gateways for reliability
  const gateways = [
    `https://gateway.pinata.cloud/ipfs/${hash}`,
    `https://ipfs.io/ipfs/${hash}`,
    `https://cloudflare-ipfs.com/ipfs/${hash}`,
  ]

  let lastError: Error | null = null

  for (const gateway of gateways) {
    try {
      const response = await fetch(gateway, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      continue
    }
  }

  throw new Error(`Failed to fetch metadata from IPFS: ${lastError?.message || "Unknown error"}`)
}

