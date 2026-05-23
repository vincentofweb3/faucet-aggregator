const { ethers } = require("ethers");

class HotWalletFaucet {
  constructor(chain) {
    this.chain = chain;
  }

  async send(walletAddress) {
    const privateKey = process.env[this.chain.privateKeyEnv];

    // No private key configured yet
    if (!privateKey) {
      throw new Error(
        `${this.chain.name} faucet is temporarily unavailable. Please check back shortly.`,
      );
    }

    const provider = new ethers.JsonRpcProvider(this.chain.rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    // Check faucet wallet balance
    const balance = await provider.getBalance(wallet.address);
    const dripWei = ethers.parseEther(this.chain.dripAmount);

    // Reserve a little for gas
    const gasBuffer = ethers.parseEther("0.002");

    if (balance < dripWei + gasBuffer) {
      throw new Error(
        `${this.chain.name} faucet is temporarily out of funds. It will be refilled shortly — please try again later.`,
      );
    }

    // Estimate gas and send
    const tx = await wallet.sendTransaction({
      to: walletAddress,
      value: dripWei,
    });

    await tx.wait();

    return {
      txHash: tx.hash,
      chain: this.chain.id,
      amount: this.chain.dripAmount,
      symbol: this.chain.symbol,
      message: `Successfully sent ${this.chain.dripAmount} ${this.chain.symbol} on ${this.chain.name}`,
      explorerUrl: this.chain.explorer
        ? `${this.chain.explorer}/tx/${tx.hash}`
        : null,
    };
  }
}

module.exports = HotWalletFaucet;
