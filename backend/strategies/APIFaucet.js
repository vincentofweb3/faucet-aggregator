class APIFaucet {
  constructor(chain) {
    this.chain = chain;
  }

  async send(walletAddress) {
    // placeholder — each chain's API call will be implemented here
    console.log(
      `[APIFaucet] Sending ${this.chain.dripAmount} ${this.chain.symbol} to ${walletAddress} on ${this.chain.name}`
    );
    return {
      txHash: null,
      chain: this.chain.id,
      amount: this.chain.dripAmount,
      symbol: this.chain.symbol,
      message: `API faucet for ${this.chain.name} — integration coming soon`,
    };
  }
}

module.exports = APIFaucet;