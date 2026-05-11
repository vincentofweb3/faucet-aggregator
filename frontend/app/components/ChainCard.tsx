"use client";

import { Chain } from "../utils/api";

interface ChainCardProps {
  chain: Chain;
  selected: boolean;
  onSelect: (chain: Chain) => void;
}

export default function ChainCard({ chain, selected, onSelect }: ChainCardProps) {
  return (
    <div
      onClick={() => onSelect(chain)}
      className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 hover:scale-105 ${
        selected
          ? "border-blue-500 bg-blue-500/10"
          : "border-gray-700 bg-gray-800/50 hover:border-gray-500"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-lg font-bold text-white">
          {chain.symbol.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-white">{chain.name}</p>
          <p className="text-sm text-gray-400">{chain.symbol}</p>
        </div>
        {selected && (
          <div className="ml-auto h-3 w-3 rounded-full bg-blue-500" />
        )}
      </div>
      <div className="mt-3 rounded-lg bg-gray-700/50 px-3 py-2">
        <p className="text-center text-sm text-gray-300">
          Get <span className="font-bold text-white">{chain.dripAmount} {chain.symbol}</span>
        </p>
      </div>
    </div>
  );
}