import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Faucet Aggregator — Get Testnet Tokens",
  description:
    "One place to claim testnet tokens across multiple chains including Sepolia, Base, Optimism, Arbitrum, GenLayer, ARC and more.",
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