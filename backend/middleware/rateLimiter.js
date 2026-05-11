const rateLimit = require("express-rate-limit");

// Global rate limiter — max 20 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    error: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Claim rate limiter — max 5 claim attempts per 15 minutes per IP
const claimLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: "Too many claim attempts, please slow down.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { globalLimiter, claimLimiter };
