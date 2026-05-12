const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export interface Chain {
  id: string;
  name: string;
  symbol: string;
  chainId: number;
  dripAmount: string;
  explorer: string;
  logoUrl: string;
  comingSoon?: boolean;
}

export interface ClaimResult {
  success: boolean;
  txHash: string | null;
  chain: string;
  amount: string;
  symbol: string;
  message: string;
  error?: string;
}

export const getChains = async (): Promise<Chain[]> => {
  const res = await fetch(`${API_BASE}/faucet/chains`);
  const data = await res.json();
  return data.chains;
};

export const claimTokens = async (
  walletAddress: string,
  chainId: string
): Promise<ClaimResult> => {
  const res = await fetch(`${API_BASE}/faucet/claim`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletAddress, chainId }),
  });
  return res.json();
};