const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const auth = require("./routes/auth");
const imageDownload = require("./routes/imagedown");
const jsonpatch = require("./routes/jpatch");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(auth);
app.use(imageDownload);
app.use(jsonpatch);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, (req, res) => {
  console.log("server is ruuning ");
});

module.exports = app;
