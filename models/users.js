const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type : String,
        required : true,
    },
    email: {
        type : String,
        required : true,
    },
    phone: {
        type : String,
        required : true,
    },
    image: {
        type : String,
        required : true,
    },
    createdOn: {
        type : Date,
        required : true,
        default: Date.now(),
    },
});

module.exports = mongoose.model('User', userSchema);