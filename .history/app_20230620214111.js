const express = require('express');
const path = require("path");
const mongoose = require("mongoose");
const Campground = require('./models/campground');

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//parse the req.body
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.render('home');
})

//show all the campgrounds
app.get("/campgrounds", async(req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index',{campgrounds})
});

//create a new campgorund(a form)
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

app.post('/campgrounds', async(req,res) => {
    const campgound = new Campground(req.body.campground);
    await campgound.save();
    res.redirect(`/campgrounds/$`)
})

//show the details of a campground
app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show',{ campground });
})


app.listen(3000, () => {
    console.log('Serving on port 3000')
})