import { useState } from "react";
import { claimTokens, ClaimResult } from "../utils/api";

export const useClaim = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClaimResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const claim = async (walletAddress: string, chainId: string, captchaToken: string) => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const data = await claimTokens(walletAddress, chainId, captchaToken);
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || "Claim failed");
      }
    } catch (err) {
      setError("Network error, please try again");
    } finally {
      setLoading(false);
    }
  };

  return { claim, loading, result, error };
};