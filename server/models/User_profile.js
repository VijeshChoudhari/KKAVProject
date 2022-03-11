const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    Email : {
        type : String,
        required : true
    },
    Name : {
        type : String,
        required : true
    },
    Profile : {
        type : String,
        required : true
    },
    Role : {
        type : String,
        default : 'Not defined'
    },
    Working_Place : {
        type : String,
        default : 'Not defined'
    },
    Github_Profile : {
        type : String,
        required : true
    },
    LinkedIn_Profile : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('UserProfile' , ProfileSchema)