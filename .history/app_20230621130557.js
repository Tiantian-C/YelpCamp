const express = require('express');
const path = require("path");
const mongoose = require("mongoose");
const engine = require('ejs-mate');
const methodOverride = require("method-override");
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

app.engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//parse the req.body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

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

//submit the form to
app.post('/campgrounds', async(req,res) => {
    const campgound = new Campground(req.body.campground);
    await campgound.save();
    res.redirect(`/campgrounds/${campgound._id}`);
})

//show the details of a campground
app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show',{ campground });
})

//edit the details of a campground(show the form)
app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground});
})

app.put('/campgrounds/:id',async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`);
})

app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})