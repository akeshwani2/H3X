require("@nomicfoundation/hardhat-toolbox");
const fs = require("fs");
const privateKey = fs.readFileSync("secret.txt").toString();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
      chainId: 11155111, // Sepolia's chain ID
    },
    sepolia: {
      url: "https://rpc.sepolia.org", // Free Sepolia RPC
      accounts: [privateKey],
      chainId: 11155111
    }
  },
  solidity: "0.8.24",
  allowUnlimitedContractSize: true,
  throwOnTransactionFailures: true,
  throwOnCallFailures: true,
  loggingEnabled: true,
};

// npx hardhat ignition deploy ./ignition/modules/WebpageStorageModule.js --network sepolia
// 0xeFba5Ef2cb48e0CE382f6d493062e567948fd682