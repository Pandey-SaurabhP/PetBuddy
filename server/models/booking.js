const mongoose = require("mongoose");
const {Schema} = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user_name: {
        type: String
    },
    pet_name: {
        type: String
    },
    datetime_of_booking: {
        type: Date
    },
    type: {
        type: String
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    payment_id: {
        type: String
    },
    pethouse_id: {
        type: String
    }
});
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
