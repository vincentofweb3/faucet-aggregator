const axios = require("axios");

const verifyHcaptcha = async (req, res, next) => {
  // Bypass if no secret configured (dev/test mode)
  if (!process.env.HCAPTCHA_SECRET) {
    console.warn("⚠️  HCAPTCHA_SECRET not set — skipping captcha verification");
    return next();
  }

  const token = req.body.hcaptchaToken;

  if (!token) {
    return res.status(400).json({
      success: false,
      error: "Please complete the captcha verification",
    });
  }

  try {
    const response = await axios.post(
      "https://hcaptcha.com/siteverify",
      new URLSearchParams({
        secret: process.env.HCAPTCHA_SECRET,
        response: token,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );

    if (!response.data.success) {
      return res.status(400).json({
        success: false,
        error: "Captcha verification failed. Please try again.",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Captcha verification error. Please try again.",
    });
  }
};

module.exports = { verifyHcaptcha };
