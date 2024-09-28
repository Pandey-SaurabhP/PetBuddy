const mongoose = require("mongoose");
const {Schema} = require('mongoose');

const adminSchema = new Schema(
    {
        admin_id: {
            type: String,
            required: true,
            unique: true
        },
        user_name: {
            type: String,
            required: true,
            unique: true
        },
        pethouse_name: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        mobile_no: {
            type: String,
            required: true,
            match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
        },
        email_id: {
            type: String,
            required: true,
            unique: true,
            match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
        },
        rating: {
            type: String,
            required: true,
            match: [/^[0-5](\.\d{1,2})?$/, 'Rating must be a number between 0 and 5, with up to 2 decimal places']
        },
        customer_feedback: [{
            type: Schema.Types.ObjectId,
            ref: 'Feedback',
            required: false
        }],  
        price: {
            type: String,
            required: true,
            match: [/^\d+(\.\d{1,2})?$/, 'Price must be a valid number with up to 2 decimal places']
        },
        services: {
            type: [String],
            required: true
        }
    }
);

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
