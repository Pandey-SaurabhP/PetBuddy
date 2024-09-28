const mongoose = require("mongoose");
const {Schema} = require('mongoose');


const vetSchema = new mongoose.Schema({
    vet_name: {
        type: String,
        required: true
    },
    vet_address: {
        type: String,
        required: true
    },
    vet_mobile: {
        type: String,
        required: true
    },
    education: {
        type: String
    },
    start_time: {
        type: String
    },
    end_time: {
        type: String
    },
    vet_fees: {
        type: String
    }
});
const Vet = mongoose.model('Vet', vetSchema);

module.exports = Vet;