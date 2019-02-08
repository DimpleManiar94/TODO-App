var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://dmaniar:flowerpot123@ds135233.mlab.com:35233/nodetodoappv1', { useNewUrlParser: true });

//Create a schema

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app) {

app.get('/todo', function(req, res) {
    //get data from mongoDB and pass it to the view
    Todo.find({}, function(err, data) {
        if(err) throw err;
        res.render('todo', {todos: data});
    });

});

app.post('/todo', urlencodedParser, function(req, res) {
    //get data from the view and add it to mongoDB
    var newTodo = Todo(req.body).save(function(err, data){
        if(err) throw err;
        res.json(data);
    });
});

app.delete('/todo/:item', function(req, res) {
    //delete the requested item from mongoDB
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
        if(err) throw err;
        res.json(data);
    });
});

}