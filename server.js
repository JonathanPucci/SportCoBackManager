const express = require("express");
const app = express();
const path = require("path");
const proxy = require("http-proxy-middleware");
var apiProxy = proxy("/api", {
  target: "https://sportcoback.herokuapp.com/api"
});
app.use(
  "/api",
  proxy({ target: "https://sportcoback.herokuapp.com/", changeOrigin: true })
);

app.use(express.static(__dirname + "/dist"));

const port = process.env.PORT || 8080;

app.listen(port);

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

console.log("App listening on port " + port + "...");
