const mongoose = require("mongoose");
const {Schema} = require('mongoose');

const petSchema = new mongoose.Schema({
    pet_id: {
        type: String
    },
    pet_name: {
        type: String
    },
    pet_age: {
        type: String
    },
    pet_weight: {
        type: String
    },
    pet_willingness: {
        type: String
    },
    pet_type: {
        type: String
    },
    user_name: {
        type: String
    },
    pet_breed: {
        type: String
    },
    pet_size: {
        type: String
    },
    pet_image: {
        type: String
    },
    pet_gender: {
        type: String
    }
});
const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
