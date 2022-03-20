const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    profile : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : 'Not defined'
    },
    place : {
        type : String,
        default : 'Not defined'
    },
    social1Link : {
        type : String,
        required : true
    },
    social2Link : {
        type : String,
        required : true
    },
    
})

module.exports = mongoose.model('UserProfile' , ProfileSchema)