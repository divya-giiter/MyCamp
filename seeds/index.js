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
            author: "6155e50ab21cccdc2405ada2",
            location: `${(cities[ran406].city)}, ${(cities[ran406].admin_name)}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images:  [
                {
                  url: 'https://res.cloudinary.com/de7i25hsd/image/upload/v1633447529/MyCamp/white-mountains_mxokfy.jpg',
                  filename: 'MyCamp/white-mountains_mxokfy'
                },
                {
                  url: 'https://res.cloudinary.com/de7i25hsd/image/upload/v1633447736/MyCamp/lake_xzwo59.jpg',
                  filename: 'MyCamp/lake_xzwo59'
                }
              ]
              ,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quo delectus voluptatum consectetur eligendi qui voluptate, rem similique aspernatur laudantium earum deleniti, ipsam mollitia, neque odio atque. Sed, enim ipsam?',
            price 
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
}); 