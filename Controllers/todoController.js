var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Todo = require('./../models/todolistModel.js');

// connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// Parse request body json. This means the request body should have json object
var urlencodedParser = bodyParser.json();

module.exports = function(app) {

    // endpoint to get all to do items associated with a list
    app.get('/todo/:id', function(req, res) {

        //find all to do items of a list
        Todo.find({listid: req.params.id}, function(err, data) {
            if(err) {
                res.json({
                    message: err.message
                });
            }
            res.json(data);
            //res.render('todo', {todos: data});
        });

    });

    // endpoint to add a new item to a todo list
    app.post('/todo', urlencodedParser, function(req, res) {

        //add new item to database
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) {
                res.json({
                    message: err.message
                });
            }
            res.json(data);
        });
    });

    // endpoint to edit a to do item
    app.put('/todo/:id', urlencodedParser, function(req, res) {

       // update to do item in database
       Todo.update({_id: req.params.id}, req.body, function(err, data) {
            if(err) {
                res.json({
                    message: err.message
                });
            }
            res.json(data);
       });
    });

    // endpoint to delete a to do item
    app.delete('/todo/:id', function(req, res) {

        //delete the requested item from mongoDB
        Todo.deleteOne({_id : req.params.id}, function(err, data){
            if(err) {
                res.json({
                    message: err.message
                });
            }
            res.json(data);
        });
    });

}