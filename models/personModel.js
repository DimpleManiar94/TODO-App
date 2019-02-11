var mongoose = require('mongoose');
var Lists = require('./listsModel.js');

var personSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "can't be blank"]
    },
    email: {
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

//if user does not enter a username, their emailid will be used as a username
personSchema.pre('save', function(next) {
    this.username = this.get('email');
    next();
});

// delete all the lists associated with the user before deleting a user
personSchema.pre('remove', {query: true}, function(next) {
    console.log('removing lists');
    Lists.deleteMany({userid: this._id}).exec();
    next();
});

var Person = mongoose.model('Users', personSchema);

module.exports = Person;