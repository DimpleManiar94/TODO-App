var mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
    listid: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    }
}, {timestamps: true});

var Tags = mongoose.model('Tags', todoSchema);

module.exports = Tags;