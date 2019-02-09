var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Person = require('./../models/personModel.js');
var Todo = require('./../models/todolistModel.js');

mongoose.connect('mongodb://dmaniar:flowerpot123@ds135233.mlab.com:35233/nodetodoappv1', { useNewUrlParser: true });

var urlencodedParser = bodyParser.json();


module.exports = function(app) {

app.post('/signup', urlencodedParser, function(req, res) {

    console.log(req.body);
    //get data from mongoDB and pass it to the view
    var newUser = Person(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
    });

});

//TODO:
/*app.post('/signin', urlencodedParser, function(req, res) {
    var todoObj = req.body;
    //get data from the view and add it to mongoDB
    var newTodo = Todo(req.body).save(function(err, data){
        if(err) throw err;
        res.json(data);
    });
});*/

app.get('/profile/:id', function(req, res) {
    //get data from mongoDB and pass it to the view
    Person.findOne({_id: req.params.id}, function(err, data) {
        if(err) throw err;
        res.json(data);
    });

});

app.put('/profile/:id', urlencodedParser, function(req, res) {
    //get data from mongoDB and pass it to the view
    Person.updateOne({_id: req.params.id}, req.body, function(err, data) {
        if(err) throw err;
        res.json(data);
    });

});

app.delete('/profile/:id', function(req, res) {
    //delete the requested item from mongoDB
    Person.deleteOne({_id: req.params.id}, function(err, data){
        if(err) throw err;
        res.json(data);
    });
});

//TODO
/*app.delete('/logout/:sessionId', function(req, res) {
    //delete the requested item from mongoDB
    Person.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
        if(err) throw err;
        res.json(data);
    });
});*/

}
