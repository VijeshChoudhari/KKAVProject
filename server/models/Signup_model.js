const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        min : 8
    },
    password : {
        type : String,
        required : true,
        min : 8,
        max : 20
    },
    profile_setup : {
        type : Boolean,
        required : true,
        default : false
    }
});

module.exports = mongoose.model('Signup', UserSchema);