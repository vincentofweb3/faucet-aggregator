const APIFaucet = require("../strategies/APIFaucet");
const HotWalletFaucet = require("../strategies/HotWalletFaucet");

// pick the right strategy based on chain type
const getStrategy = (chain) => {
  if (chain.type === "api") return new APIFaucet(chain);
  if (chain.type === "hotwallet") return new HotWalletFaucet(chain);
  throw new Error(`Unknown faucet type: ${chain.type}`);
};

const processClaim = async (walletAddress, chain) => {
  const strategy = getStrategy(chain);
  const result = await strategy.send(walletAddress);
  return result;
};

module.exports = { processClaim };