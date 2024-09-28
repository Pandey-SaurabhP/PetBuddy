const mongoose = require("mongoose");
const {Schema} = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    password: {
        type: String
    },
    user_name: {
        type: String
    },
    user_address: {
        type: String
    },
    mobile_number: {
        type: String
    }
});
const Users = mongoose.model('Users', userSchema);

module.exports = Users;
