"use client";

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-gray-950 text-white overflow-hidden">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800/50">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🚰</span>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            DripLane
          </span>
        </div>
        <div className="flex items-center gap-6">
            <button
                onClick={() => document.getElementById("chains")?.scrollIntoView({ behavior: "smooth" })}
                className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                Chains
                </button>
                <button
                onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}
                className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                How it works
            </button>
          <button
            onClick={onEnter}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500 transition-colors"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-32 text-center">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400">
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            Multi-chain testnet faucet aggregator
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-6xl">
            Get testnet tokens
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              fast, in one place
            </span>
          </h1>

          <p className="mb-10 text-lg text-gray-400 max-w-xl mx-auto">
            DripLane aggregates testnet faucets across 15+ chains so you never
            have to hunt for tokens again. Connect your wallet or paste your
            address and claim in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onEnter}
              className="w-full sm:w-auto rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold hover:bg-blue-500 transition-all hover:scale-105 active:scale-95"
            >
              Start Claiming →
            </button>
            <button
                onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto rounded-xl border border-gray-700 px-8 py-4 text-lg font-bold text-gray-300 hover:border-gray-500 hover:text-white transition-all"
            >
                How it works
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-800/50 bg-gray-900/30 px-6 py-10">
        <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "15+", label: "Supported chains" },
            { value: "Free", label: "Always free" },
            { value: "24h", label: "Cooldown period" },
            { value: "Fast", label: "Instant delivery" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Supported chains */}
      <section id="chains" className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center text-3xl font-bold">Supported chains</h2>
          <p className="mb-10 text-center text-gray-400">
            Claim testnet tokens across all major networks
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              "Ethereum Sepolia", "Ethereum Hoodi", "Base Sepolia",
              "Optimism Sepolia", "Arbitrum Sepolia", "Polygon Amoy",
              "BNB Testnet", "Avalanche", "Scroll Sepolia",
              "GenLayer", "ARC Testnet", "zkSync Sepolia",
              "Linea Sepolia", "Monad Testnet", "More soon...",
            ].map((chain) => (
              <div
                key={chain}
                className="rounded-xl border border-gray-800 bg-gray-900/50 px-3 py-3 text-center text-sm text-gray-300 hover:border-gray-600 transition-colors"
              >
                {chain}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="px-6 py-20 bg-gray-900/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center text-3xl font-bold">How it works</h2>
          <p className="mb-12 text-center text-gray-400">
            Three simple steps to get your testnet tokens
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enter your address",
                desc: "Connect your MetaMask wallet for auto-fill, or simply paste your wallet address manually.",
                icon: "🔗",
              },
              {
                step: "02",
                title: "Pick a chain",
                desc: "Choose from 15+ supported testnets. See exactly how many tokens you'll receive before claiming.",
                icon: "⛓️",
              },
              {
                step: "03",
                title: "Receive tokens",
                desc: "Hit claim and receive your testnet tokens instantly. Come back in 24 hours for more.",
                icon: "💧",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-sm font-bold text-blue-400">
                    STEP {item.step}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to get your testnet tokens?
          </h2>
          <p className="mb-8 text-gray-400">
            No registration required. Just connect your wallet and start claiming.
          </p>
          <button
            onClick={onEnter}
            className="rounded-xl bg-blue-600 px-10 py-4 text-lg font-bold hover:bg-blue-500 transition-all hover:scale-105 active:scale-95"
          >
            Launch DripLane →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 px-6 py-8 text-center text-sm text-gray-500">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span>🚰</span>
          <span className="font-bold text-gray-400">DripLane</span>
        </div>
        <p>Multi-chain testnet faucet aggregator - Free forever</p>
      </footer>

    </main>
  );
}