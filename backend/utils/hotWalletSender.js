// utils/hotWalletSender.js
const { ethers } = require("ethers");
const chainsConfig = require("../chains.config");

async function sendFromHotWallet(chainId, recipientAddress) {
  const chain = chainsConfig.chains.find(
    (c) => c.type === "hotwallet" && c.chainId === chainId,
  );

  if (!chain)
    throw new Error(`No hot wallet chain found for chainId ${chainId}`);
  if (chain.comingSoon)
    throw new Error(`${chain.name} faucet is not yet funded.`);

  const privateKey = process.env[chain.privateKeyEnv];
  if (!privateKey) throw new Error(`Missing env var: ${chain.privateKeyEnv}`);

  const provider = new ethers.JsonRpcProvider(chain.rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  const tx = await wallet.sendTransaction({
    to: recipientAddress,
    value: ethers.parseEther(chain.drip),
  });

  await tx.wait();
  return { txHash: tx.hash, amount: chain.drip, chain: chain.name };
}

module.exports = { sendFromHotWallet };
