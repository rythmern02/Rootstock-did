/**
 * Contract Configuration
 * Update this with your deployed contract address
 * 
 * Set NEXT_PUBLIC_CONTRACT_ADDRESS in your .env.local file
 * Example: NEXT_PUBLIC_CONTRACT_ADDRESS=0x50778F0d9E831DBaf8070d557e1248E958c169f9
 * 
 * The address will be automatically checksummed using EIP-55 format
 */

import { getAddress } from "viem"

// Get contract address from environment or use default
const rawAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000"

// Ensure address is properly checksummed (EIP-55 format)
// This fixes the "Address must match its checksum counterpart" error
export const CONTRACT_ADDRESS = getAddress(rawAddress) as `0x${string}`

