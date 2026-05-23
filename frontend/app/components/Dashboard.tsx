"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import WalletConnect from "./WalletConnect";
import ChainCard from "./ChainCard";
import ClaimButton from "./ClaimButton";
import { getChains, Chain } from "../utils/api";
import { useClaim } from "../hooks/useClaim";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRef } from "react";

interface DashboardProps {
  onBack: () => void;
}

export default function Dashboard({ onBack }: DashboardProps) {
  const { address, isConnected } = useAccount();
  const [chains, setChains] = useState<Chain[]>([]);
  const [selectedChain, setSelectedChain] = useState<Chain | null>(null);
  const [walletInput, setWalletInput] = useState("");
  const { claim, loading, result, error } = useClaim();

  const captchaRef = useRef<HCaptcha>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  useEffect(() => {
    getChains().then(setChains);
  }, []);

  useEffect(() => {
    if (address) setWalletInput(address);
  }, [address]);

  const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(walletInput);

  const handleClaim = async () => {
    if (!walletInput || !selectedChain || !isValidAddress || !captchaToken) return;
    await claim(walletInput, selectedChain.id, captchaToken);
    captchaRef.current?.resetCaptcha();
    setCaptchaToken(null);
  };

  const activeChains = chains.filter((c) => !c.comingSoon);
  const soonChains = chains.filter((c) => c.comingSoon);

  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* Top nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-gray-800/50 bg-gray-950/80 backdrop-blur">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <span>←</span>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            DripLane
          </span>
        </button>
        <WalletConnect />
      </nav>

      <div className="mx-auto max-w-3xl px-4 py-8">

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Claim Testnet Tokens</h1>
          <p className="mt-1 text-gray-400 text-sm">
            Select a chain and enter your wallet address to receive free testnet tokens
          </p>
        </div>

        {/* Wallet input card */}
        <div className="mb-6 rounded-2xl border border-gray-800 bg-gray-900/50 p-5">
          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Your Wallet Address
          </label>
          <div className="relative">
            <input
              type="text"
              value={walletInput}
              onChange={(e) => setWalletInput(e.target.value)}
              placeholder="0x... or connect wallet above"
              className={`w-full rounded-xl border px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all bg-gray-800/50 ${
                walletInput && !isValidAddress
                  ? "border-red-500/50 focus:border-red-400"
                  : walletInput && isValidAddress
                  ? "border-green-500/50 focus:border-green-400"
                  : "border-gray-700 focus:border-blue-500"
              }`}
            />
            {walletInput && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                {isValidAddress ? (
                  <span className="text-green-400">✓ Valid</span>
                ) : (
                  <span className="text-red-400">✗ Invalid</span>
                )}
              </div>
            )}
          </div>
          {isConnected && address && walletInput === address && (
            <p className="mt-1.5 text-xs text-green-400">✓ Connected wallet auto-filled</p>
          )}
          {!walletInput && (
            <p className="mt-1.5 text-xs text-gray-500">
              💡 Connect your wallet above to auto-fill
            </p>
          )}
        </div>

        {/* Active chains */}
        <div className="mb-6">
          <h2 className="mb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Available chains ({activeChains.length})
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {activeChains.map((chain) => (
              <ChainCard
                key={chain.id}
                chain={chain}
                selected={selectedChain?.id === chain.id}
                onSelect={setSelectedChain}
              />
            ))}
          </div>
        </div>

        {/* Coming soon chains */}
        {soonChains.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Coming soon ({soonChains.length})
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {soonChains.map((chain) => (
                <ChainCard
                  key={chain.id}
                  chain={chain}
                  selected={false}
                  onSelect={() => {}}
                />
              ))}
            </div>
          </div>
        )}

        {/* Selected chain summary */}
        {selectedChain && (
          <div className="mb-4 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
            <p className="text-sm text-gray-300">
              You will receive{" "}
              <span className="font-bold text-white">
                {selectedChain.dripAmount} {selectedChain.symbol}
              </span>{" "}
              on{" "}
              <span className="font-bold text-white">{selectedChain.name}</span>
              {walletInput && isValidAddress && (
                <>
                  {" "}→{" "}
                  <span className="font-mono text-xs text-blue-400">
                    {walletInput.slice(0, 6)}...{walletInput.slice(-4)}
                  </span>
                </>
              )}
            </p>
          </div>
        )}

        {/* hCaptcha */}
        <div className="mb-4">
          <HCaptcha
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY!}
            onVerify={(token) => setCaptchaToken(token)}
            onExpire={() => setCaptchaToken(null)}
            ref={captchaRef}
            theme="dark"
          />
        </div>

        {/* Claim button */}
        <ClaimButton
          onClick={handleClaim}
          loading={loading}
          disabled={!selectedChain || !isValidAddress || !captchaToken}
          result={result}
          error={error}
          selectedChain={selectedChain?.id || null}
        />

      </div>
    </main>
  );
}