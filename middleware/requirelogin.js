const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ error: "please loggedin first" });
  }

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ err: "you must be loggedin" });
    }

    req.user = payload;
    next();
  });
};
