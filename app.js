var express = require('express');
var todoController = require('./Controllers/todoController.js');
var authenticateController = require('./Controllers/authenticateController');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

//fire controllers

todoController(app);
authenticateController(app);


app.listen(3000);
console.log('You are listening to port 3000');