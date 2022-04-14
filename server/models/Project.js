const mongoose = require('mongoose');

const AddProjectSchema = mongoose.Schema({
    Email : {
        type : String,
        required : true
    },  

    Project_Name : {
        type : String,
        required : true,
        min : 3
    },
    Tech_Stack : [String],

    Github_Link : {
        type : String,
        min : 8,
        required : true
    },
    About_Project : {
        type : String, 
        required: true
        
    },
    Date_Of_Created : {
        type : Date,
        required : true,
        default : Date.now,
    }
});

module.exports = mongoose.model('UserProject' , AddProjectSchema);