const express = require("express");
const app = express();
const path = require("path");
const {createProxyMiddleware} = require("http-proxy-middleware");
var apiProxy = createProxyMiddleware("/api", {
  target: "https://sportcoback.herokuapp.com/api"
});
app.use(
  "/api",
  createProxyMiddleware({ target: "https://sportcoback.herokuapp.com/", changeOrigin: true })
);

app.use(express.static(__dirname + "/dist"));

const port = process.env.PORT || 4200;

app.listen(port);

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

console.log("App listening on port " + port + "...");
