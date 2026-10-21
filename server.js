const express = require("express");
const app = express();
const mongoose = require("mongoose");
let dbUrl = "mongodb://127.0.0.1:27017/Stayora";
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

async function main() {
  await mongoose.connect(dbUrl);
}
main()
  .then(() => {
    console.log("DB Is Running");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Him Am Root Page");
});
app.get("/listings", async (req, res) => {
  let allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
});
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listingDetail = await Listing.findById(id);
  res.render("listings/listingDetail.ejs", { listingDetail });
});

app.listen(3000, () => {
  console.log("Server is listening at 3000");
});
