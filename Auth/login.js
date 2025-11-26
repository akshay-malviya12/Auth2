const { generateJwtToken, refreshJwtToken } = require("./jwtToken");
const bcrypt = require("bcrypt");
const db = require("../DbConnect");

const login = (req, resp) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return resp.status(400).json({ message: "Email & password required" });
  }

  db.query("SELECT * FROM auth WHERE email = ?", [email], async (err, result) => {
    if (err) return resp.status(500).json({ message: "DB Error" });

    const user = result[0];
    if (!user) return resp.status(401).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return resp.status(400).json({ message: "Incorrect password" });

    const accessToken = generateJwtToken(user);
    const refreshToken = refreshJwtToken(user);

    db.query(
      "UPDATE auth SET refresh_token = ? WHERE email = ?",
      [refreshToken, email],
      (err) => {
        if (err) return resp.status(500).json({ message: "DB error" });
         console.log(refreshToken)
        return resp.status(200).json({
          message: "Login successful",
          token: accessToken,
          refreshToken: refreshToken,
        });
      }
    );
  });
};

module.exports = login;
