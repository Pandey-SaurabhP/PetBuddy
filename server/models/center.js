const mongoose = require("mongoose");
const {Schema} = require('mongoose');

const centerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    address: {
        type: String
    },
    rating: {
        type: String
    },
    price: {
        type: String
    },
});
const Center = mongoose.model('Center', centerSchema);

module.exports = Center;