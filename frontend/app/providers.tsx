"use client";

import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";
import {
  sepolia,
  baseSepolia,
  optimismSepolia,
  arbitrumSepolia,
  scrollSepolia,
  polygonAmoy,
  bscTestnet,
  avalancheFuji,
} from "wagmi/chains";

const config = getDefaultConfig({
  appName: "Faucet Aggregator",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID",
  chains: [
    sepolia,
    baseSepolia,
    optimismSepolia,
    arbitrumSepolia,
    scrollSepolia,
    polygonAmoy,
    bscTestnet,
    avalancheFuji,
  ],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}