// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// Unix timestamp for January 1st, 2030 (in seconds)
const JAN_1ST_2030 = 1893456000;
// 0.001 ETH in Wei (1 * 10^15), using BigInt notation for large numbers
const SMALL_AMOUNT = 1000000000000000n;

// Export a module named "LockModule" that defines the deployment configuration
module.exports = buildModule("LockModule", (m) => {
  // Get deployment parameters with default values:
  // - unlockTime: when the locked funds can be withdrawn (defaults to Jan 1st 2030)
  // - lockedAmount: amount of ETH to lock in the contract (defaults to 0.001 ETH)
  const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
  const lockedAmount = m.getParameter("lockedAmount", SMALL_AMOUNT);

  // Deploy the Lock contract with:
  // - Constructor argument: unlockTime
  // - Transaction value: lockedAmount (ETH to be locked in the contract)
  const lock = m.contract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  // Return the deployed contract instance for use in other modules or scripts
  return { lock };
});