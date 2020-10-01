const express = require("express");
const jsonpatch = require("json-patch");
const router = express.Router();
const requirelogin = require("../middleware/requirelogin");

router.post("/patch", requirelogin, (req, res) => {
  let document = req.body.oldObject;

  let patch = req.body.patchObject;

  document = jsonpatch.apply(document, patch);
  res.json({ document });
});

module.exports = router;
