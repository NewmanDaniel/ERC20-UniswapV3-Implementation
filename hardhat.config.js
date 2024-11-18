require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL, // Fetch from .env
      accounts: [process.env.PRIVATE_KEY], // Fetch from .env
    },
    hardhat: {
      forking: {
        url: process.env.SEPOLIA_RPC_URL,
      },
    },
  }
};
