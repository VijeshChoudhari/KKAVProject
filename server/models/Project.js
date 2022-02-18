const mongoose = require('mongoose');

const AddProjectSchema = mongoose.Schema({
    Project_Name : {
        type : String,
        required : true
    },
    Tech_Stack : [String],

    Github_Link : {
        type : String,
    },
    About_Project : {
        type : String, 
        required: true
    },
    Date_Of_Created : {
        type : Date,
        default : Date.now,
    }
});

module.exports = mongoose.model('UserProject' , AddProjectSchema);