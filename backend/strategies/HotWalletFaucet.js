const { ethers } = require("ethers");

class HotWalletFaucet {
  constructor(chain) {
    this.chain = chain;
  }

  async send(walletAddress) {
    const provider = new ethers.JsonRpcProvider(this.chain.rpcUrl);
    const wallet = new ethers.Wallet(this.chain.walletKey, provider);

    const amount = ethers.parseEther(this.chain.dripAmount);

    console.log(
      `[HotWalletFaucet] Sending ${this.chain.dripAmount} ${this.chain.symbol} to ${walletAddress} on ${this.chain.name}`
    );

    const tx = await wallet.sendTransaction({
      to: walletAddress,
      value: amount,
    });

    await tx.wait();

    return {
      txHash: tx.hash,
      chain: this.chain.id,
      amount: this.chain.dripAmount,
      symbol: this.chain.symbol,
      message: `Successfully sent ${this.chain.dripAmount} ${this.chain.symbol}`,
    };
  }
}

module.exports = HotWalletFaucet;