// Dependencies for Server and DB connection
var express = require('express');
var mongoose = require('mongoose');

// Creating MongoDB Schemas -- Templates

var userSchema = mongoose.Schema({ // Schemas -- Everything with mongoose is derived from a schema
  name: String,
  role: String,
  iuID: Number
});


userSchema.methods.greet = function () {
  var greeting = this.name ? "Hi. My name is " + this.name : "Go Away"
  console.log(greeting);
}

var app = express();
var db = mongoose.connect('mongodb://localhost/mydb'); // Connect to MongoDB:mydb
var server = require('http').Server(app);

// DB connection Status
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
  // yay!
});



var User = mongoose.model('User', userSchema);

// Creating documents/instances ("entries")
var joe = new User({ name: "Joe Box", role: "Packer", iuID: "12345" });
console.log(joe.name);

var jill = new User({ name: "Jill Box", role: "Picker", iuID: "67891" });
jill.greet();

// Adding to a DB
joe.save(function(err, fluffy) {
  if (err) return console.error(err);
  joe.greet();
});

jill.save();


// Routing
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

