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
   
});

module.exports = mongoose.model('Signup', UserSchema);