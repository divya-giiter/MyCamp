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
            author: "615ab3f997eae6ee10f25013",
            location: `${(cities[ran406].city)}, ${(cities[ran406].admin_name)}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images:  [
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png',
                    filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
                },
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ruyoaxgf72nzpi4y6cdi.png',
                    filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
                }
            ],
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