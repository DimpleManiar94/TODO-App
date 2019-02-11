var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    listid: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Done'],
        default: 'Pending'
    },
    deadline: Date
}, {timestamps: true});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

