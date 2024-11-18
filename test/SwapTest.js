const { expect } = require("chai");
const { ethers } = require("hardhat");
require("dotenv").config();
const CONFIG = require("../config.js");
const {
  abi: SWAP_ROUTER_ABI,
  bytecode: SWAP_ROUTER_BYTECODE,
} = require("@uniswap/swap-router-contracts/artifacts/contracts/SwapRouter02.sol/SwapRouter02.json");
const swapRouterAddress = CONFIG.swapRouterAddress;
const SPUP_ADDRESS = CONFIG.SPUP_ADDRESS;

describe("Swap ETH for SashaPup Tokens", function () {
  let swapRouter;
  let sashaPupToken;
  let owner;

  before(async function () {
    [owner] = await ethers.getSigners();

    // Instantiate the Swap Router contract
    swapRouter = await ethers.getContractAt(
      SWAP_ROUTER_ABI,
      CONFIG.swapRouterAddress,
      owner,
    );

    // Instantiate the SashaPup Token contract
    sashaPupToken = await ethers.getContractAt(
      "IERC20",
      CONFIG.SPUP_ADDRESS,
      owner,
    );
  });

  it("Should swap ETH for SashaPup tokens using UniswapV3 LP via frontend payload", async function () {
    const amountIn = ethers.parseEther("0.01");
    const amountOutMinimum = 0;

    const params = {
      tokenIn: "0xfff9976782d46cc05630d1f6ebab18b2324d6b14", // Sepolia WETH contract address
      tokenOut: SPUP_ADDRESS,
      fee: 3000,
      recipient: owner.address,
      amountIn: amountIn,
      amountOutMinimum: 98,
      sqrtPriceLimitX96: 0,
    };

    try {
      const tx = await swapRouter.exactInputSingle(params, {
        value: amountIn,
      });

      await tx.wait();

      const spupBalance = await sashaPupToken.balanceOf(owner.address);

      console.log(
        `Received SPUP tokens: ${ethers.formatUnits(spupBalance, 18)}`,
      );

      // Assert that we have received the coins successfully by checking that the balance is greater than zero.
      expect(spupBalance).to.be.gt(0);
    } catch (error) {
      console.error("Swap failed:", error);
      expect.fail("Swap transaction failed");
    }
  });
});

