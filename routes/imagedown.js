const express = require("express");
const router = express.Router();
const requirelogin = require("../middleware/requirelogin");
const fs = require("fs");
const request = require("request");
const sharp = require("sharp");
let i = 11;
router.post("/imagedown", requirelogin, (req, res) => {
  const url = req.body.url;
  const path = "./images/image" + i++ + ".png";
  const path2 = "./images/image" + i++ + ".png";

  const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
      request(url).pipe(fs.createWriteStream(path)).on("close", callback);
    });
  };

  download(url, path, (res) => {
    sharp(path).resize(50, 50).jpeg({ quality: 100 }).toFile(path2);
  });

  res.json({ path2 });
});

module.exports = router;
