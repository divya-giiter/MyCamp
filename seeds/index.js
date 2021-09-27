const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers.js');
const Campground = require('../models/campground.js');


mongoose.connect('mongodb://localhost:27017/my-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<50; i++)
    {
        const ran406 = Math.floor(Math.random() * 406);
        const price = Math.floor(Math.random() * 2000) + 800;
        const camp = new Campground({
            location: `${(cities[ran406].city)}, ${(cities[ran406].admin_name)}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quo delectus voluptatum consectetur eligendi qui voluptate, rem similique aspernatur laudantium earum deleniti, ipsam mollitia, neque odio atque. Sed, enim ipsam?',
            price 
        })
        await camp.save();
    }
    const c = new Campground({title: 'Purple Field'});
    await c.save();
}

seedDB().then(() => {
    mongoose.connection.close();
}); 
