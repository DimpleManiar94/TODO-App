var mongoose = require('mongoose');
var Todo = require('./todolistModel.js');

var personSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "can't be blank"]
    },
    emailid: {
        type: String,
        required: [true, "can't be blank"],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

}, {timestamps: true});

personSchema.pre('save', function(next) {
    this.username = this.get('emailid');
    next();
});


personSchema.pre('remove', {query: true}, function(next) {
    console.log('removing todo');
    Todo.deleteMany({userid: this._id}).exec();
    next();
});

var Person = mongoose.model('Users', personSchema);

module.exports = Person;