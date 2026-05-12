const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

class APIFaucet {
  constructor(chain) {
    this.chain = chain;
  }

  async send(walletAddress) {
    const handler = this.getHandler();
    return await handler(walletAddress);
  }

  getHandler() {
    const handlers = {
      sepolia: this.alchemy.bind(this),
      "arbitrum-sepolia": this.alchemy.bind(this),
      "base-sepolia": this.alchemy.bind(this),
      "op-sepolia": this.alchemy.bind(this),
      "scroll-sepolia": this.alchemy.bind(this),
      "polygon-amoy": this.polygon.bind(this),
      "bnb-testnet": this.bnb.bind(this),
      "avalanche-fuji": this.avalanche.bind(this),
      hoodi: this.hoodi.bind(this),
    };

    const handler = handlers[this.chain.id];
    if (!handler) {
      return this.placeholder.bind(this);
    }
    return handler;
  }

  // ── Alchemy faucet (Sepolia, Base, OP, Arbitrum, Scroll) ──
  async alchemy(walletAddress) {
    const networkMap = {
      sepolia: "ETH_SEPOLIA",
      "arbitrum-sepolia": "ARB_SEPOLIA",
      "base-sepolia": "BASE_SEPOLIA",
      "op-sepolia": "OPT_SEPOLIA",
      "scroll-sepolia": "SCROLL_SEPOLIA",
    };

    const network = networkMap[this.chain.id];

    const res = await fetch("https://api.g.alchemy.com/v2/faucet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ALCHEMY_API_KEY}`,
      },
      body: JSON.stringify({
        address: walletAddress,
        network: network,
      }),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      throw new Error(
        data.error?.message || data.message || "Alchemy faucet request failed",
      );
    }

    return {
      txHash: data.txHash || null,
      chain: this.chain.id,
      amount: this.chain.dripAmount,
      symbol: this.chain.symbol,
      message: `Successfully requested ${this.chain.dripAmount} ${this.chain.symbol} from Alchemy faucet`,
    };
  }

  // ── Polygon Amoy ──────────────────────────────────────────
  async polygon(walletAddress) {
    const res = await fetch("https://faucet.polygon.technology/api/faucet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: walletAddress,
        network: "amoy",
        token: "maticToken",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Polygon faucet request failed");
    }

    return {
      txHash: data.txHash || null,
      chain: this.chain.id,
      amount: this.chain.dripAmount,
      symbol: this.chain.symbol,
      message: `Successfully requested ${this.chain.dripAmount} ${this.chain.symbol} from Polygon faucet`,
    };
  }

  // ── BNB Testnet ───────────────────────────────────────────
  async bnb(walletAddress) {
    const res = await fetch(
      "https://testnet.bnbchain.org/faucet-smart/api/claim",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `address=${walletAddress}`,
      },
    );

    const text = await res.text();

    return {
      txHash: null,
      chain: this.chain.id,
      amount: this.chain.dripAmount,
      symbol: this.chain.symbol,
      message: `BNB faucet request submitted for ${walletAddress}`,
    };
  }

  // ── Avalanche Fuji ────────────────────────────────────────
  async avalanche(walletAddress) {
    const res = await fetch("https://faucet.avax-test.network/sendtoken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: walletAddress,
        token: "AVAX",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Avalanche faucet request failed");
    }

    return {
      txHash: data.txHash || null,
      chain: this.chain.id,
      amount: this.chain.dripAmount,
      symbol: this.chain.symbol,
      message: `Successfully requested ${this.chain.dripAmount} ${this.chain.symbol} from Avalanche faucet`,
    };
  }

  // ── Hoodi ─────────────────────────────────────────────────
  async hoodi(walletAddress) {
    const res = await fetch("https://holesky-faucet.pk910.de/api/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: walletAddress }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Hoodi faucet request failed");
    }

    return {
      txHash: data.txHash || null,
      chain: this.chain.id,
      amount: this.chain.dripAmount,
      symbol: this.chain.symbol,
      message: `Successfully requested ${this.chain.dripAmount} ${this.chain.symbol} from Hoodi faucet`,
    };
  }

  // ── Placeholder for unimplemented chains ──────────────────
  async placeholder(walletAddress) {
    return {
      txHash: null,
      chain: this.chain.id,
      amount: this.chain.dripAmount,
      symbol: this.chain.symbol,
      message: `${this.chain.name} faucet integration coming soon`,
    };
  }
}

module.exports = APIFaucet;
