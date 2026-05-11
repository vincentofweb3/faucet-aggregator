"use client";

import { ClaimResult } from "../utils/api";

interface ClaimButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
  result: ClaimResult | null;
  error: string | null;
  selectedChain: string | null;
}

export default function ClaimButton({
  onClick,
  loading,
  disabled,
  result,
  error,
  selectedChain,
}: ClaimButtonProps) {
  return (
    <div className="w-full">
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={`w-full rounded-xl px-6 py-4 text-lg font-bold transition-all duration-200 ${
          disabled || loading
            ? "cursor-not-allowed bg-gray-700 text-gray-400"
            : "bg-blue-600 text-white hover:bg-blue-500 active:scale-95"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Sending tokens...
          </span>
        ) : !selectedChain ? (
          "Select a chain first"
        ) : (
          "Claim Tokens"
        )}
      </button>

      {/* Success message */}
      {result && (
        <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 p-4">
          <p className="font-semibold text-green-400">
            ✅ Successfully claimed {result.amount} {result.symbol}!
          </p>
          {result.txHash && (
            <p className="mt-1 text-sm text-gray-400">
              Tx:{" "}
              <span className="font-mono text-blue-400">
                {result.txHash.slice(0, 20)}...
              </span>
            </p>
          )}
          <p className="mt-1 text-sm text-gray-400">{result.message}</p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
          <p className="font-semibold text-red-400">❌ {error}</p>
        </div>
      )}
    </div>
  );
}