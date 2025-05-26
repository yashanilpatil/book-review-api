const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
    [username, email, hashed]
  );
  res.json({ message: "User registered" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const userResult = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  const user = userResult.rows[0];
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  res.json({ token });
};
