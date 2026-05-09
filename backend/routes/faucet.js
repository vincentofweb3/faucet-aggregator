const express = require("express");
const router = express.Router();
const { getEnabledChains, getChain } = require("../config/chains.config");
const claimService = require("../services/claimService");

// GET /api/faucet/chains  — return all supported chains
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

// POST /api/faucet/claim  — request tokens
router.post("/claim", async (req, res) => {
  const { walletAddress, chainId } = req.body;

  // basic validation
  if (!walletAddress || !chainId) {
    return res.status(400).json({
      success: false,
      error: "walletAddress and chainId are required",
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
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
