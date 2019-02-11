var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Person = require('./../models/personModel.js');

//Connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// Parse request body json. This means the request body should have json
var urlencodedParser = bodyParser.json();

module.exports = function(app) {

// endpoint for registering a new user in the database
app.post('/signup', urlencodedParser, function(req, res) {

    // save the new user in mongodb
    var newUser = Person(req.body).save(function(err, data){
        if(err) {
            res.json({
                message: err.message
            });
        }
        res.json(data);
    });

});

// endpoint to get user profile details from database
app.get('/profile/:id', function(req, res) {

    //find user by userid
    Person.find({_id: req.params.id}, function(err, data) {
        if(err) {
            res.json({
                message: err.message
            });
        }
        res.json(data);
    });
});

//endpoint to edit user info
app.put('/profile/:id', urlencodedParser, function(req, res) {

    //update user info of user
    Person.update({_id: req.params.id}, req.body, function(err, data) {
        if(err) {
            res.json({
                message: err.message
            });
        }
        res.json(data);
    });

});

// endpoint to delete user profile
app.delete('/profile/:id', function(req, res) {

    //delete user from database
    Person.deleteOne({_id: req.params.id}, function(err, data){
        if(err) {
            res.json({
                message: err.message
            });
        }
        res.json(data);
    });
});


}
