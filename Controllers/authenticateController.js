
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Person = require('./../models/personModel.js');
var Todo = require('./../models/todolistModel.js');

// Connect to Database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// Parse json objects in request body
var urlencodedParser = bodyParser.json();


module.exports = function(app) {

//TODO:
/*app.post('/signin', urlencodedParser, function(req, res) {
    var todoObj = req.body;
    //get data from the view and add it to mongoDB
    var newTodo = Todo(req.body).save(function(err, data){
        if(err) throw err;
        res.json(data);
    });
});*/


//TODO
/*app.delete('/logout/:sessionId', function(req, res) {
    //delete the requested item from mongoDB
    Person.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
        if(err) throw err;
        res.json(data);
    });
});*/

}
