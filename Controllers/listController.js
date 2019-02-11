var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Lists = require('./../models/listsModel.js');

// Connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// Parse json Object in request object. This means put and post requests should have json body.
var urlencodedParser = bodyParser.json();


module.exports = function(app) {

// endpoint to Create a new list
app.post('/list', urlencodedParser, function(req, res) {

    // Create a new list from request body and save in mongodb
    var newList = Lists(req.body).save(function(err, data){
        if(err) {
            res.json({
                message: err.message
            });
        }
        res.json(data);
    });

});

//endpoint to get all lists made a user with userid=id
app.get('/list/:userid', function(req, res) {

    // Find all the lists given a userid
    Lists.find({userid: req.params.userid}, function(err, data) {
        if(err) {
            res.json({
                message: err.message
            });
        }
        res.json(data);
    });

});

// endpoint to search lists by their name
// request url should look something like /list/search/name?userid=userid&name=name
app.get('/list/search/name', function(req, res) {

    //find all the lists of user with id=userid and name=name
    Lists.find({userid: req.query.userid, name: req.query.name}, function(err, data) {
        if(err) {
            res.json({
                message: err.message
            });
        }
        res.json(data);
    });

});

//endpoint to search lists by tags
// request url should look something like /list/search/tag?userid=userid&tag=tag
app.get('/list/search/tag', function(req, res) {

    //find all lists of user with id=userid that has a tag=tag
    Lists.find({userid: req.query.userid, tags: {tag: req.params.tag}}, function(err, data) {
        if(err) {
            res.json({
                message: err.message
            });
        }
        res.json(data);
    });

});

// endpoint that lets you edit name of a list with id=id
app.put('/list/:id', urlencodedParser, function(req, res) {

    //update name of a list with _id=id from request body
    Lists.update({_id: req.params.id}, req.body, function(err, data) {
        if(err) {
            res.json({
                message: err.message
            });
        }
        res.json(data);
    });

});

//endpoint to add a new tag in an existing list

app.put('/list/addTag/:listid', urlencodedParser, function(req, res) {

    // find the list and push request body object in tags array
    Lists.find({_id: req.params.listid}).tags.push(req.body).save(function(err, data) {
        if(err) {
            res.json({
                message: err.message
            });
        }
        res.json(data);
    });
});

// endpoint that lets you edit an existing tag on a list
// request url should look something like this: /list/editTag?listid=listid&tagid=tagid

app.put('/list/editTag', urlencodedParser, function(req, res) {

    //updates tag of list=listid and tag=tagid with data given in request body
    Lists.update({_id: req.query.listid, tags: {_id: req.query.tagid}}, req.body, function(err, data) {
        if(err) {
            res.json({
                message: err.message
            });
        }
        res.json(data);
    });

});

// endpoint to delete existing tag in a list
//request url should look something like: /list/removeTag?listid=listid&tagid=tagid
app.put('/list/removeTag', function(req, res) {
    //delete the requested tag from mongoDB
    Lists.find({_id: req.query.listid}).pull(tags: {_id: req.query.tagid}).save(function(err, data) {
        if(err) {
            res.json({
                message: err.message
            });
        }
        res.json(data);
    });
});

// endpoint to delete a list
app.delete('/list/:id', function(req, res) {

    //delete the requested list from mongoDB
    Lists.deleteOne({_id: req.params.id}, function(err, data){
        if(err) {
            res.json({
                message: err.message
            });
        }
        res.json(data);
    });
});

}