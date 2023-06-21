const mongoose = require("mongoose");
const cities = require('./cities')
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
    //use Campground model to delete everything.
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++){
        const random1000 =M Matn.randon() * 1000
    }
}

seedDB();