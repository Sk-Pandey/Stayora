const express = require("express");
const app = express();
const mongoose = require("mongoose");
let dbUrl = "mongodb://127.0.0.1:27017/Stayora";
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
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
  res.render("listings/index.ejs", {
    allListings,
    title: "All Listings | StayHub",
  });
});
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs", { title: "Add New Place | StayHub" });
});
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listingDetail = await Listing.findById(id);
  res.render("listings/listingDetail.ejs", {
    listingDetail,
    title: `${listingDetail.title} | StayHub`,
  });
});

app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listingDetail = await Listing.findById(id);
  res.render("listings/edit.ejs", {
    listingDetail,
    title: `Edit: ${listingDetail.title} | StayHub`,
  });
});
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});
app.delete("/listings/:id/", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

app.listen(3000, () => {
  console.log("Server is listening at 3000");
});
