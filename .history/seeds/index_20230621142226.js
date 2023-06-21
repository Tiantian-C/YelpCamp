/**creating and inserting initial data**/

const mongoose = require("mongoose");
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
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

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    //use Campground model to delete everything.
    await Campground.deleteMany({});
    //craete 50 instances in campground database.
    for (let i = 0; i < 50; i++){
      const random1000 = Math.floor(Math.random() * 1000); 
      const price =Math.floor()
        const camp = new Campground({
          location: `${cities[random1000].city},${cities[random1000].state}`,
          title: `${sample(descriptors)} ${sample(places)}`,
          image: "https:/source.unsplash.com/collection/483251",
          description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat voluptatibus",
          price:
        });
        await camp.save();
    }
}

//close database connection
seedDB().then(() => {
    mongoose.connection.close();
})
