const express = require("express");
const router = express.Router();
const { getEnabledChains, getChain } = require("../config/chains.config");
const claimService = require("../services/claimService");
const { claimLimiter } = require("../middleware/rateLimiter");

// GET /api/faucet/chains
router.get("/chains", (req, res) => {
  const chains = getEnabledChains().map((c) => ({
    id: c.id,
    name: c.name,
    symbol: c.symbol,
    chainId: c.chainId,
    dripAmount: c.dripAmount,
    explorer: c.explorer,
    logoUrl: c.logoUrl,
  }));
  res.json({ success: true, chains });
});

// POST /api/faucet/claim
router.post("/claim", claimLimiter, async (req, res) => {
  const { walletAddress, chainId } = req.body;

  if (!walletAddress || !chainId) {
    return res.status(400).json({
      success: false,
      error: "walletAddress and chainId are required",
    });
  }

  // basic wallet address validation
  if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
    return res.status(400).json({
      success: false,
      error: "Invalid wallet address format",
    });
  }

  const chain = getChain(chainId);
  if (!chain) {
    return res.status(404).json({
      success: false,
      error: "Chain not supported",
    });
  }

  try {
    const result = await claimService.processClaim(walletAddress, chain);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
