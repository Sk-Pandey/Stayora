const mongoose = require("mongoose");
const initData = require("./data.js");
let dbUrl = "mongodb://127.0.0.1:27017/Stayora";
const Listing = require("../models/listing.js");

async function main() {
  await mongoose.connect(dbUrl);
}
main()
  .then(() => {
    console.log("DB Is Running");
  })
  .catch((err) => console.log(err));

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("Data Was Initilised");
};

initDB();
