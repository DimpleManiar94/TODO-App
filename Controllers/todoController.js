var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Todo = require('./../models/todolistModel.js');

mongoose.connect('mongodb://dmaniar:flowerpot123@ds135233.mlab.com:35233/nodetodoappv1', { useNewUrlParser: true });

//Create a schema

/*var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);*/

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.json();

module.exports = function(app) {

app.get('/todo/:id', function(req, res) {
    //get data from mongoDB and pass it to the view
    Todo.find({userid: req.params.id}, function(err, data) {
        if(err) throw err;
        //res.json(data);
        res.render('todo', {todos: data});
    });

});

app.post('/todo', urlencodedParser, function(req, res) {
    console.log(req.body);
    //get data from the view and add it to mongoDB
    var newTodo = Todo(req.body).save(function(err, data){
        if(err) throw err;
        res.json(data);
    });
});

app.put('/todo/:id', urlencodedParser, function(req, res) {
    console.log(req.body);
   var update = Todo.update({_id: req.params.id}, req.body, function(err, data) {
        if(err) throw err;
        res.json(data);
   });
});

app.delete('/todo/:id', function(req, res) {
console.log(req.params.id)
    //delete the requested item from mongoDB
    Todo.deleteOne({_id : req.params.id}, function(err, data){
        if(err) throw err;
        res.json(data);
    });
});

}