const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    Profile : {
        type : String,
        required : true
    },
    Role : {
        type : String,
        required : true
    },
    Working_place : {
        type : String,
        required : true
    },
    Github_profile : {
        type : String,
    },
    Linkedln_profile : {
        type : String
    }
})

module.exports = mongoose.model('UserProfile' , ProfileSchema)