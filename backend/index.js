require("dotenv").config();
require("./config/db");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { globalLimiter } = require("./middleware/rateLimiter");

const faucetRoutes = require("./routes/faucet");

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ───────────────────────────────────────────────
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(globalLimiter);

// ── Routes ───────────────────────────────────────────────────
app.use("/api/faucet", faucetRoutes);

// ── Health check ─────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Faucet API is running" });
});

// ── 404 handler ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ── Global error handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`✅ Faucet API running on port ${PORT}`);
});

module.exports = app;