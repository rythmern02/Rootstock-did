# 🆔 Decentralized Identity (DID) DApp - Rootstock

A self-sovereign identity system built on Rootstock blockchain with IPFS integration. Create verifiable identities, issue credentials, and manage your digital reputation - all secured by Bitcoin's hashrate.

![Rootstock](https://img.shields.io/badge/Rootstock-Testnet-orange) ![Solidity](https://img.shields.io/badge/Solidity-^0.8.20-blue) ![Next.js](https://img.shields.io/badge/Next.js-15-black) ![IPFS](https://img.shields.io/badge/IPFS-Pinata-cyan)

---

## 🎯 Overview

Traditional identity systems are centralized and vulnerable. This DApp enables self-sovereign identity where YOU control what's shared, who sees it, and how it's used.

**Architecture:** React Frontend → MetaMask → Rootstock Smart Contract → IPFS Storage

**Key Concept:** Identity data stored on IPFS, IPFS hashes stored on-chain for verification.

---

## ✨ Features

- **W3C DID Compliant** - Standards-based decentralized identifiers
- **Profile Management** - Username, bio, profile pictures, social links
- **IPFS Storage** - Decentralized file storage via Pinata
- **Verifiable Credentials** - Issue and verify KYC, education, employment credentials
- **NFT Avatars** - Set owned NFTs as profile pictures
- **Social Recovery** - Multi-sig account recovery mechanism
- **Trust Network** - Build reputation with trusted credential issuers

---

## 🛠 Tech Stack

**Blockchain**
- Rootstock (RSK) - EVM-compatible blockchain with Bitcoin security
- Solidity ^0.8.20 - Smart contract language
- Remix IDE - Browser-based contract deployment
- Viem - TypeScript Ethereum library

**Frontend**
- Next.js 15 - React framework with TypeScript
- Wagmi - React hooks for wallet integration
- Tailwind CSS - Utility-first styling
- shadcn/ui - UI component library

**Storage**
- IPFS - Decentralized file storage
- Pinata - IPFS pinning service with API

---

## 📦 Prerequisites

**Required:**
- Node.js v18+
- MetaMask browser extension
- Pinata account (free tier works)
- Basic knowledge of Solidity, React, and blockchain concepts

---

## 🚀 Quick Start

### 1. MetaMask Configuration

Add Rootstock Testnet:

| Parameter | Value |
|-----------|-------|
| Network Name | Rootstock Testnet |
| RPC URL | `https://public-node.testnet.rsk.co` |
| Chain ID | `31` |
| Currency Symbol | `tRBTC` |
| Block Explorer | `https://explorer.testnet.rsk.co` |

### 2. Get Test Funds

Visit [faucet.rootstock.io](https://faucet.rootstock.io) and request tRBTC (arrives in 30-60 seconds).

### 3. Pinata Setup

1. Create account at [pinata.cloud](https://pinata.cloud)
2. Generate API key from dashboard
3. Save JWT token for environment variables

### 4. Deploy Smart Contract

**Using Remix IDE:**
1. Go to [remix.ethereum.org](https://remix.ethereum.org)
2. Create `IdentityRegistry.sol` with contract code
3. Compile with Solidity ^0.8.20
4. Connect MetaMask (Injected Provider)
5. Deploy to Rootstock Testnet
6. Save deployed contract address

### 5. Frontend Setup

```bash
# Clone repository
git clone https://github.com/rythmern02/rootstock-did-dapp.git
cd rootstock-did-dapp

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt_token
```

### 6. Run Application

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

Access at `http://localhost:3000`

---

## 📖 Usage

### Creating Identity

1. Connect MetaMask wallet
2. Fill profile: username, bio, display name
3. Upload profile picture (auto-uploads to IPFS)
4. Click "Create Identity" and confirm transaction
5. Wait ~30 seconds for blockchain confirmation

### Viewing Profiles

- Search by wallet address or username
- Browse recent identities on homepage
- Click profile to view credentials and details

### Issuing Credentials

1. Navigate to user's profile
2. Click "Issue Credential" (requires verified issuer)
3. Select credential type and upload proof documents
4. Set expiration date (optional)
5. Confirm transaction

### Verifying Credentials

- Contract checks issuer, expiration, and revocation
- IPFS content validates against stored hash
- Visual badges show verification status

---

## 🏗 Architecture Flow

**Identity Creation:**
1. User fills profile form in React dApp
2. Frontend uploads images to IPFS via Pinata
3. Receives IPFS hash (e.g., `QmX1234...`)
4. User signs transaction via MetaMask
5. Smart contract stores: `mapping[address] = ipfsHash`
6. Transaction confirmed on Rootstock

**Identity Retrieval:**
1. Query contract with wallet address
2. Retrieve IPFS hash from blockchain
3. Fetch content from IPFS gateway
4. Display profile data in UI

---

## 🔐 Security

**Smart Contract:**
- Owner-only access controls for identity updates
- Input validation on all functions
- Event logging for audit trails
- Reentrancy protection

**IPFS:**
- Content addressing ensures data integrity
- Pinata provides reliable pinning
- Hashes stored on-chain prevent tampering

**Frontend:**
- Environment variables for sensitive data
- Input sanitization to prevent XSS
- HTTPS enforcement in production
- Regular dependency updates

---

## 🌐 Deployment

**Smart Contract:**
1. Deploy via Remix IDE to Rootstock Testnet
2. Verify contract on [explorer.testnet.rsk.co](https://explorer.testnet.rsk.co)
3. Save contract address and ABI

**Frontend:**
- **Vercel:** Connect GitHub repo, add env vars, deploy
- **Netlify:** Similar to Vercel with auto-deployment
- **IPFS:** Fully decentralized hosting via Fleek

---

## 🤝 Contributing

Contributions welcome! Fork the repo, create a feature branch, and submit a pull request.

**Guidelines:**
- Write clear, commented code
- Follow existing code style
- Update documentation as needed

---

## 📚 Resources

- [Rootstock Docs](https://docs.rootstock.io) - Rootstock documentation
- [Pinata Docs](https://docs.pinata.cloud) - IPFS pinning guide
- [Wagmi Docs](https://wagmi.sh) - React Web3 hooks
- [Remix IDE](https://remix.ethereum.org) - Solidity IDE
- [W3C DID Spec](https://www.w3.org/TR/did-core/) - DID standards

---

## 🐛 Troubleshooting

**MetaMask Won't Connect**
- Verify Chain ID is 31
- Check RPC URL is correct
- Reset MetaMask connection

**Transaction Fails**
- Ensure sufficient tRBTC for gas
- Verify contract address is correct
- Check function parameters

**IPFS Upload Fails**
- Confirm Pinata JWT is valid
- Check file size under 5MB
- Verify network connection

---

## 📄 License

MIT License - See LICENSE file for details

---


---

**Built with ❤️ on Rootstock - Where Bitcoin Meets Identity**
