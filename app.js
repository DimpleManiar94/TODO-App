var express = require('express');
var todoController = require('./Controllers/todoController.js');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

//fire controllers

todoController(app);


app.listen(3000);
console.log('You are listening to port 3000');