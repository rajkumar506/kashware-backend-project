const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

router.post("/signin", (req, res) => {
  const user = ({ email, password } = req.body);

  if (!email || !password) {
    return res.json({ message: "please enter email and password" });
  }

  const token = jwt.sign({ user }, JWT_SECRET);
  res.json({ token: token });
});

module.exports = router;
