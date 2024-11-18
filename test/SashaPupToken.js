const { expect } = require("chai");

describe("SashaPupToken", function () {
  let Token, sashaPupToken, owner, addr1, addr2;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("SashaPupToken");
    [owner, addr1, addr2] = await ethers.getSigners();
    sashaPupToken = await Token.deploy(ethers.parseUnits("1000000", 18));
    await sashaPupToken.waitForDeployment();
  });

  it("Should assign the total supply to the owner", async function () {
    const ownerBalance = await sashaPupToken.balanceOf(owner.address);
    expect(await sashaPupToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Should allow transfers between accounts", async function () {
    await sashaPupToken.transfer(addr1.address, ethers.parseUnits("100", 18));
    const addr1Balance = await sashaPupToken.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(ethers.parseUnits("100", 18));
  });

  it("Should emit Transfer events", async function () {
    await expect(sashaPupToken.transfer(addr1.address, ethers.parseUnits("100", 18)))
      .to.emit(sashaPupToken, "Transfer")
      .withArgs(owner.address, addr1.address, ethers.parseUnits("100", 18));
  });

  it("Should fail if sender doesn’t have enough tokens", async function () {
  const initialOwnerBalance = await sashaPupToken.balanceOf(owner.address);

  // Expect any revert (custom error or reason string)
  await expect(
    sashaPupToken.connect(addr1).transfer(owner.address, ethers.parseUnits("1", 18))
  ).to.be.reverted;

  // Verify that the owner's balance remains unchanged
  expect(await sashaPupToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
});


});
