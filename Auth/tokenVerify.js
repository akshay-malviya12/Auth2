const jwt = require("jsonwebtoken");
const {generateJwtToken} = require("./jwtToken");
const db = require("../DbConnect");
require("dotenv").config();
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const tokenVerify = (req, resp) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return resp.status(401).json({ Message: "Refresh token required" });
  }
console.log(refreshTokenSecret)
console.log(refresh_token)
  // Verify the refresh token
  jwt.verify(refresh_token, refreshTokenSecret, (err, decoded) => {
    if (err) {
      return resp.status(401).json({ Message: "Invalid refresh token" });
    }

    const email = decoded.data.email; // Extract from token payload
     
    db.query("SELECT * FROM auth WHERE email=?", [email], (err, rows) => {
      if (err) {
        return resp.status(500).json({ Message: "DB error" });
      }

      const userRow = rows[0];
      if (!userRow) {
        return resp.status(401).json({ Message: "User not found" });
      }

      // Compare DB refresh token
      if (refresh_token !== userRow.refresh_token) {
        return resp.status(403).json({ Message: "Token mismatch" });
      }

      // Generate new access token
      const newAccessToken = generateJwtToken(userRow);

      resp.status(200).json({
        Message: "New access token generated",
        accessToken: newAccessToken,
        refreshToken: refresh_token
      });
    });
  });
};

module.exports = tokenVerify;
