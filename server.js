const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.send("Him Am Root Page");
});
app.listen(3000, () => {
  console.log("Server is listening at 3000");
});
