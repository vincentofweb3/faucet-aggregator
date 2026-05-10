const pool = require("../config/db");
const APIFaucet = require("../strategies/APIFaucet");
const HotWalletFaucet = require("../strategies/HotWalletFaucet");

const getStrategy = (chain) => {
  if (chain.type === "api") return new APIFaucet(chain);
  if (chain.type === "hotwallet") return new HotWalletFaucet(chain);
  throw new Error(`Unknown faucet type: ${chain.type}`);
};

// check if wallet already claimed in last 24hrs for this chain
const checkCooldown = async (walletAddress, chainId) => {
  const result = await pool.query(
    `SELECT created_at FROM claims 
     WHERE wallet_address = $1 
     AND chain_id = $2 
     AND created_at > NOW() - INTERVAL '24 hours'
     ORDER BY created_at DESC 
     LIMIT 1`,
    [walletAddress.toLowerCase(), chainId],
  );

  if (result.rows.length > 0) {
    const lastClaim = new Date(result.rows[0].created_at);
    const nextClaim = new Date(lastClaim.getTime() + 24 * 60 * 60 * 1000);
    const hoursLeft = Math.ceil((nextClaim - Date.now()) / (1000 * 60 * 60));
    throw new Error(
      `You already claimed from this faucet. Try again in ${hoursLeft} hour(s).`,
    );
  }
};

// log the claim to the database
const logClaim = async (walletAddress, chain, txHash, status = "success") => {
  await pool.query(
    `INSERT INTO claims (wallet_address, chain_id, tx_hash, amount, symbol, status)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      walletAddress.toLowerCase(),
      chain.id,
      txHash,
      chain.dripAmount,
      chain.symbol,
      status,
    ],
  );
};

const processClaim = async (walletAddress, chain) => {
  // 1. check cooldown first
  await checkCooldown(walletAddress, chain.id);

  // 2. pick strategy and send tokens
  const strategy = getStrategy(chain);
  const result = await strategy.send(walletAddress);

  // 3. log to database
  await logClaim(walletAddress, chain, result.txHash);

  return result;
};

module.exports = { processClaim };
