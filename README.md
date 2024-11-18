# What is this?
This is a test implementation for setting up a simple ERC-20 token called SashaPup, and making it swappable for Eth on Uniswap V3 via a frontend interface on the Ethereum Sepolia network. Once implemented, the user can use their Metamask wallet to purchase SashaPup via a Uniswap V3 liquidity pool.

# set up nvm & install dependencies
`nvm use --lts`
`npm install`

# Set up config files.
copy config.js.example & .env.example to config.js and .env, and fill out the variables as you go along

*Please ensure your infura URL is entered in properly to .env*

# Deploy the contract
`npx hardhat compile`
`npx hardhat run scripts/deploy.js --network sepolia`

Please save the contract address in the config.js file.

# Set up liquidity pool.
Before starting, ensure your metamask wallet is set to the sepolia testnet.

1) Navigate to https://app.uniswap.org/ and connect your metamask.
2) Under the settings gear, click Testnet and make sure it's enabled. (you may need to set your metamask wallet back to sepolia if it's glitching out.)
3) Click Pool
4) Click New Position
5) Click Select token, and under the search bar enter the SashaPup contract address
6) For testing purposes, I use the following options
```
low price: 0
High Price: infinity, (spam with numbers until there's a bunch then tab out)
Starting eth Price: 333333.333333  SPUP per ETH,
Deposit amounts:
0.04 eth
13334.2 SPUP
```

Then confirm with your metamask. You should hopefully be able to successfully create a functional LP that pairs Eth and Sashapup, and can now move onto getting the pool address.

# Calculate the Pool Address using the UniswapV3Factory contract
1) Navigate to https://sepolia.etherscan.io/address/0x0227628f3F023bb0B980b67D528571c95c6DaC1c#readContract
2)
    Enter 0xfff9976782d46cc05630d1f6ebab18b2324d6b14 for first input address (This is the WETH contract address for Sepolia)
  
    Enter the SashaPup contract you noted down Address for Address 2
  
    Enter 3000 for input 3 (This represents the 0.3% fee for the pool, please use a different value if you entered in something different)
  
4) Click Query, and the pool address will be computed. Please save it in config.js, It's needed for the web frontend to work

# How to serve the frontend test
1) run command: `npm install -g http-server`
2) run the command `http-server` in your terminal in the repo root.
3) in your browser go to http://127.0.0.1:8080/purchase_spup_frontend.html

# Purchase SashaPup!
Enter how much SashaPup you want to purchase. The current SashaPup/ETH exchange rate and number of required eth for purchase will be displayed. Click Buy SashaPup. You will be prompted to confirm the purchase on Metamask. It'll take a couple minutes, then it should hopefully work and you'll have some brand new SashaPups!

# Run Tests
In the repo root, run the command `npx hardhat test`. 
This will run a Suite of tests. One test, labeled _Swap ETH for SashaPup Tokens_, tests the payload emitted by the front-end that enables the user to purchase SashaPup from the eth-SashaPup UniswapV3 LP.
