const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mvp');
// 2. Set up any schema and models needed by the app
const schema = new mongoose.Schema({
  location: {
    type: String,
    unique: true
  },
});

const Location = mongoose.model('Location', schema);

// 3. Export the models
module.exports.getAll = () => {
  return Location.find()
}

module.exports.addLocation = (location) => {
  Location.create(location)
    .then(() => {
      console.log('Location added to DB');
    })
    .catch((err) => {
      console.log('Error adding location to DB', err);
    })
}

module.exports.deleteLocation = (location) => {
  Location.deleteOne(location)
    .then(() => {
      console.log('Deleted from DB');
    })
    .catch((err) => {
      console.log('Error deleting from DB');
    })
}