const mongoose = require('mongoose');
const { descriptions, places } = require('./seedhelpers');
const Campground = require('../models/campground');
const { cities } = require('./cities');
mongoose.set('strictQuery', true);

console.log(cities[0].latitude+ "  "+ cities[0].longitude)
              
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/camp-finder');
}

const size = cities.length;
console.log(size);

console.log(places);

const seedDB = async () => {
    await Campground.deleteMany({});

    for (let i = 0; i < size; i++) {
        let randomNum = Math.floor(Math.random() * 75);        
        let randomSmall = Math.floor(Math.random() * 10);
        const newCamp = new Campground(
            {
                title: `${descriptions[randomSmall]} ${places[randomSmall]}`,
                location: `${cities[randomNum].name}, ${cities[randomNum].state}`,
                description: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non reiciendis odit dolorum ducimus repellendus quaerat cumque est soluta placeat quos autem doloremque nobis porro, temporibus fugiat deserunt! Ex, inventore libero',
                image: 'https://source.unsplash.com/collection/483251',
                price: Math.floor(Math.random() * 1000)
            })

        await newCamp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close();
    });