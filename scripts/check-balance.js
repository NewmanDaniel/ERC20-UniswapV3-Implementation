const { ethers } = require("hardhat");

async function main() {
  // Replace with your Sepolia account address
  const account = "0xC0C16eE2B23c54D404D50EA8027270940f5Df442";

  // Fetch balance
  const balance = await ethers.provider.getBalance(account);

  console.log(`Balance of ${account}: ${ethers.formatEther(balance)} ETH`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
