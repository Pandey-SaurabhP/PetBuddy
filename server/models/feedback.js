const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const feedbackSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    center_id: {
        type: Schema.Types.ObjectId,
        ref: 'Center', 
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5 
    },
    review: {
        type: String,
        required: true
    },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
