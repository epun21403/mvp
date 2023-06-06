require('dotenv').config();
const axios = require('axios');

const url = process.env.URL;
const key = process.env.KEY;

module.exports.weather = (location) => {
  return axios.get(`${url}key=${key}&q=${location}`)
}