require('dotenv').config()
const express = require('express');
const path = require('path');
const {getAll, addLocation, deleteLocation} = require('./db/database');
const {weather} = require('./weatherApi')

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/mvp', (req,res) => {
  getAll()
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log('Error retrieving locations', err)
  })
})

app.post('/mvp', (req, res) => {
  addLocation(req.body)
  res.send('Word posted to DB')
})

app.delete('/mvp', (req, res) => {
  deleteLocation(req.body)
  res.send('Deletion successful')
})

app.get('/weather/:location', (req, res) => {
  console.log(req.params.location);
  const location = JSON.stringify(req.params.location);
  weather(location)
  .then((info) => {
    console.log(info.data)
    res.send(info.data);
  })
  .catch((err) => {
    console.log('Error getting weather data ', err);
  })
})


app.listen(port, function () {
 console.log('App listening on port: ' + port);
});
