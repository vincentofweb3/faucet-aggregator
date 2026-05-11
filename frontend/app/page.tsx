"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import WalletConnect from "./components/WalletConnect";
import ChainCard from "./components/ChainCard";
import ClaimButton from "./components/ClaimButton";
import { getChains, Chain } from "./utils/api";
import { useClaim } from "./hooks/useClaim";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [chains, setChains] = useState<Chain[]>([]);
  const [selectedChain, setSelectedChain] = useState<Chain | null>(null);
  const [walletInput, setWalletInput] = useState("");
  const { claim, loading, result, error } = useClaim();

  useEffect(() => {
    getChains().then(setChains);
  }, []);

  // auto-fill input when wallet connects
  useEffect(() => {
    if (address) {
      setWalletInput(address);
    }
  }, [address]);

  const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(walletInput);

  const handleClaim = async () => {
    if (!walletInput || !selectedChain || !isValidAddress) return;
    await claim(walletInput, selectedChain.id);
  };

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              🚰 Faucet Aggregator
            </h1>
            <p className="mt-1 text-gray-400">
              Claim testnet tokens across multiple chains
            </p>
          </div>
          <WalletConnect />
        </div>

        {/* Wallet address input */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-semibold text-gray-300">
            Wallet Address
          </label>
          <div className="relative">
            <input
              type="text"
              value={walletInput}
              onChange={(e) => setWalletInput(e.target.value)}
              placeholder="Connect wallet above or paste your 0x address here"
              className={`w-full rounded-xl border px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all duration-200 bg-gray-800 ${
                walletInput && !isValidAddress
                  ? "border-red-500 focus:border-red-400"
                  : walletInput && isValidAddress
                  ? "border-green-500 focus:border-green-400"
                  : "border-gray-700 focus:border-blue-500"
              }`}
            />
            {/* status indicator */}
            {walletInput && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isValidAddress ? (
                  <span className="text-green-400">✓</span>
                ) : (
                  <span className="text-red-400">✗</span>
                )}
              </div>
            )}
          </div>
          {/* helper text */}
          {walletInput && !isValidAddress && (
            <p className="mt-1 text-xs text-red-400">
              Invalid address — must start with 0x and be 42 characters
            </p>
          )}
          {isConnected && address && walletInput === address && (
            <p className="mt-1 text-xs text-green-400">
              ✓ Connected wallet auto-filled
            </p>
          )}
          {!isConnected && !walletInput && (
            <p className="mt-1 text-xs text-gray-500">
              💡 Tip: Connect your wallet above to auto-fill your address
            </p>
          )}
        </div>

        {/* Chain selector */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-300">
            Select a chain
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {chains.map((chain) => (
              <ChainCard
                key={chain.id}
                chain={chain}
                selected={selectedChain?.id === chain.id}
                onSelect={setSelectedChain}
              />
            ))}
          </div>
        </div>

        {/* Selected chain info */}
        {selectedChain && (
          <div className="mb-6 rounded-xl border border-gray-700 bg-gray-800/50 p-4">
            <p className="text-gray-400">
              You will receive{" "}
              <span className="font-bold text-white">
                {selectedChain.dripAmount} {selectedChain.symbol}
              </span>{" "}
              on{" "}
              <span className="font-bold text-white">
                {selectedChain.name}
              </span>{" "}
              →{" "}
              <span className="font-mono text-sm text-blue-400">
                {walletInput
                  ? `${walletInput.slice(0, 6)}...${walletInput.slice(-4)}`
                  : "no address entered"}
              </span>
            </p>
          </div>
        )}

        {/* Claim button */}
        <ClaimButton
          onClick={handleClaim}
          loading={loading}
          disabled={!selectedChain || !isValidAddress}
          result={result}
          error={error}
          selectedChain={selectedChain?.id || null}
        />

        {/* How it works */}
        <div className="mt-12 rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            How it works
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex gap-3">
              <span className="text-2xl">1️⃣</span>
              <div>
                <p className="font-semibold text-white">Enter address</p>
                <p className="text-sm text-gray-400">
                  Connect your wallet or paste your address manually
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">2️⃣</span>
              <div>
                <p className="font-semibold text-white">Pick a chain</p>
                <p className="text-sm text-gray-400">
                  Select which testnet you need tokens for
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">3️⃣</span>
              <div>
                <p className="font-semibold text-white">Claim tokens</p>
                <p className="text-sm text-gray-400">
                  Hit claim and receive tokens in seconds
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}