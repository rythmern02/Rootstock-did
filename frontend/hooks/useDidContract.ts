import {
    useReadContract,
    useWriteContract,
    useWaitForTransactionReceipt,
  } from "wagmi"
  import { CONTRACT_ADDRESS } from "@/config/contract"
  import  IDENTITY_REGISTRY_ABI  from "@/contract/abi/did.json"
  
  // -----------------------------
  // 🔹 READ HOOKS
  // -----------------------------
  
  /**
   * Read the raw identity document for a given address
   */
  export function useGetIdentity(owner?: `0x${string}`) {
    return useReadContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: IDENTITY_REGISTRY_ABI,
      functionName: "getIdentity",
      args: owner ? [owner] : undefined,
      query: {
        enabled: Boolean(owner),
      },
    })
  }
  
  /**
   * Read the full identity metadata (document, updatedAt, version, lastUpdater)
   */
  export function useGetIdentityMetadata(owner?: `0x${string}`) {
    return useReadContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: IDENTITY_REGISTRY_ABI,
      functionName: "getIdentityMetadata",
      args: owner ? [owner] : undefined,
      query: {
        enabled: Boolean(owner) && Boolean(CONTRACT_ADDRESS && CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000"),
        retry: false, // Don't retry on revert
      },
    })
  }
  
  // -----------------------------
  // 🔹 WRITE HOOKS
  // -----------------------------
  
  /**
   * Write — set or update identity document
   * @param document - IPFS CID / DID string / metadata JSON URL
   */
  export function useSetIdentity() {
    const { writeContract, data: hash, isPending, error } = useWriteContract()
    const wait = useWaitForTransactionReceipt({ hash })
  
    function setIdentity(document: string) {
      if (!document) throw new Error("Document string required")
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: IDENTITY_REGISTRY_ABI,
        functionName: "setIdentity",
        args: [document],
      })
    }
  
    return {
      setIdentity,
      hash,
      isPending,
      wait,
      error,
    }
  }
  
  /**
   * Write — clear (revoke) your own identity
   */
  export function useClearIdentity() {
    const { writeContract, data: hash, isPending, error } = useWriteContract()
    const wait = useWaitForTransactionReceipt({ hash })
  
    function clearIdentity() {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: IDENTITY_REGISTRY_ABI,
        functionName: "clearIdentity",
        args: [],
      })
    }
  
    return {
      clearIdentity,
      hash,
      isPending,
      wait,
      error,
    }
  }
  