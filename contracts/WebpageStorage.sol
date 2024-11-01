// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;  // Specifies the Solidity compiler version

// Contract for storing webpage information on the blockchain
contract WebpageStorage {
    // Defines the structure for storing webpage data
    struct Webpage {
        string cid;        // Content Identifier (IPFS hash)
        address owner;     // Ethereum address of webpage owner
        uint256 timestamp; // Time when webpage was stored
    }

    // Maps domain names to their corresponding Webpage struct
    mapping(string => Webpage) public webpages;
    // Maps user addresses to an array of their domain names
    mapping(address => string[]) public userWebpages;

    // Event emitted when a new webpage is stored
    event WebpageStored(string domain, string cid, address owner, uint256 timestamp);

    // Function to store a new webpage or update an existing one
    function storeWebpage(string memory domain, string memory cid) public {
        // Input validation
        require(bytes(domain).length > 0, "Domain cannot be empty");
        require(bytes(cid).length > 0, "CID cannot be empty");

        // Create and store the webpage data
        webpages[domain] = Webpage(cid, msg.sender, block.timestamp);
        // Add domain to user's list of webpages
        userWebpages[msg.sender].push(domain);

        // Emit event for frontend/indexing
        emit WebpageStored(domain, cid, msg.sender, block.timestamp);
    }

    // Function to retrieve webpage information by domain
    function getWebpage(string memory domain) public view returns (string memory, address, uint256) {
        // Get webpage data from storage
        Webpage memory webpage = webpages[domain];
        // Verify webpage exists
        require(bytes(webpage.cid).length > 0, "Webpage not found");
        // Return webpage details: CID, owner address, and timestamp
        return (webpage.cid, webpage.owner, webpage.timestamp);
    }

    // Function to retrieve all webpages owned by a user
    function getUserWebpages(address user) public view returns (string[] memory) {
        return userWebpages[user];
    }
}
