var express = require('express');
var app = express();

var server = require('http').Server(app);

/* Connect to MongoDB*/
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/mydb');

/* Creating a Model in MongoDB */
mongoose.model('users', {name: String});
mongoose.model('posts', {content: String});
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/views/welcome.html");
});

app.get('/users', function (req, res) {
  mongoose.model('users').find(function (err, users) {
    res.send(users);
  });
});

app.get('/posts', function (req, res) {
  mongoose.model('posts').find(function (err, posts) {
    res.send(posts);
  });
});

server.listen(3000);

