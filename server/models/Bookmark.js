const mongoose = require('mongoose')

const bookmarkSchema = mongoose.Schema({
    Email : {
        type : String,
        required : true
    },

    ProjectId : {
        type : String,
        required : true
    },

    ProjectName : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('BookmarkSchema', bookmarkSchema);