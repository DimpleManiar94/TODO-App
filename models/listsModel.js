var Todo = require('./todolistModel.js');

var mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true
    }
});

var listsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tags: [tagSchema],
    userid: {
        type: String,
        required: true,
    }
}, {timestamps: true});

// remove all associated to do items with the list before deleting list
listsSchema.pre('remove', {query: true}, function(next) {
    console.log('removing todo and tags');
    Todo.deleteMany({listid: this._id}).exec();
    next();
});

var Lists = mongoose.model('Lists', listsSchema);

module.exports = Lists;

