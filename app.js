const express = require('express');
const path = require('path')
const mongoose = require('mongoose')
const app = express()

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/camp-finder');
}

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(3000, () => {
    console.log("App listening on port 3000");
})