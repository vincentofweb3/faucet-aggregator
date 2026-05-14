import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DripLane — Multi-chain Testnet Faucet",
  description:
    "Get free testnet tokens across 15+ chains including Sepolia, Base, Optimism, Arbitrum, GenLayer, ARC and more. One place for all your testnet needs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}