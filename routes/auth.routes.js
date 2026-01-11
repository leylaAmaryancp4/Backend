//register/login

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { readJSON, writeJSON } = require("../utils/jsonStor");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

//register

router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  const users = readJSON("users.json");
  if (users.find((u) => u.email === email))
    return res.status(400).send(" email exists");

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = {
    id: uuidv4(),
    email,
    passwordHash,
    role: role || "customer",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeJSON("users.json", users);

  const token = jwt.sign(
    { id: newUser.id, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
});

//login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = readJSON("users.json");
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).send("Invalid email");
  }

  const passwordValid = await bcrypt.compare(password, user.passwordHash);
  if (!passwordValid) {
    return res.status(400).send("Invalid password");
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
});

module.exports = router;
