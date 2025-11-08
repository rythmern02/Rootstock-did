// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title Simple Identity Registry (Self-Sovereign Version)
/// @notice Each user can set and update their own on-chain identity document.
/// @dev Ideal for tutorials and dApp demos. Keeps code minimal but production-ready.

contract IdentityRegistry {
    /// @dev A small record storing a user’s identity and metadata.
    struct Identity {
        string document;      // DID document or pointer (e.g., "ipfs://Qm...")
        uint256 updatedAt;    // Last update timestamp
        uint256 version;      // Incrementing version counter
        address lastUpdater;  // Always the owner (msg.sender)
    }

    /// @dev Mapping from wallet address → Identity record
    mapping(address => Identity) private identities;



    /// @dev Emitted whenever a user updates their identity
    event IdentityUpdated(address indexed owner, string document, uint256 version);

    /// -----------------------------------------------------------------------
    /// Main Functionality
    /// -----------------------------------------------------------------------

    /// @notice Set or update your own identity document
    /// @param document The identity string or pointer (e.g., IPFS CID, JSON URL)
    function setIdentity(string calldata document) external {
        
        Identity storage rec = identities[msg.sender];
        rec.document = document;
        rec.updatedAt = block.timestamp;
        unchecked { rec.version = rec.version + 1; }
        rec.lastUpdater = msg.sender;

        emit IdentityUpdated(msg.sender, document, rec.version);
    }

    /// @notice Clear your identity document (acts as revocation)
    function clearIdentity() external {
        Identity storage rec = identities[msg.sender];
        rec.document = "";
        rec.updatedAt = block.timestamp;
        unchecked { rec.version = rec.version + 1; }
        rec.lastUpdater = msg.sender;

        emit IdentityUpdated(msg.sender, "", rec.version);
    }

    /// -----------------------------------------------------------------------
    /// Read Functions
    /// -----------------------------------------------------------------------

    /// @notice Get the identity document string for an address
    /// @param owner The address to query
    /// @return document The identity document string
    function getIdentity(address owner) external view returns (string memory document) {
        return identities[owner].document;
    }

    /// @notice Get the full identity record including metadata
    /// @param owner The address to query
    function getIdentityMetadata(address owner)
        external
        view
        returns (string memory document, uint256 updatedAt, uint256 version, address lastUpdater)
    {
        Identity storage rec = identities[owner];
        return (rec.document, rec.updatedAt, rec.version, rec.lastUpdater);
    }
}

