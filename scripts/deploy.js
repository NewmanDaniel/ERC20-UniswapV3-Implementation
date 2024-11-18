const hre = require("hardhat");

async function main() {
  const initialSupply = hre.ethers.parseUnits("1000000", 18);
  const [deployer] = await hre.ethers.getSigners(); // Get deployer wallet
  console.log("Deploying contract with deployer address:", deployer.address);

  const SashaPupToken = await hre.ethers.getContractFactory("SashaPupToken");
  const sashaPupToken = await SashaPupToken.deploy(initialSupply);

  await sashaPupToken.waitForDeployment();

  console.log("SashaPupToken deployed to:", sashaPupToken.target);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
