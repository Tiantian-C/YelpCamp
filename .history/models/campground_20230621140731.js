const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundScheme = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
});

//campgrounds is the database's name
module.exports = mongoose.model("Campground", CampgroundScheme);