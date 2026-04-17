const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json("No token ❌");
  }

  // 🔥 NEW: safer split
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", verified); // 🔥 DEBUG

    // 🔥 IMPORTANT CHANGE
    req.user = {
      id: verified.id || verified._id || verified.userId, // handle all cases
    };

    next();
  } catch (err) {
    console.log("Auth Error:", err); // 🔥 DEBUG
    res.status(400).json("Invalid token ❌");
  }
};