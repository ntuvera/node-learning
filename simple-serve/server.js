// Simplified Version - no Generators -- Taught by DarthNeel

// Dependencies
var express = require('express');
var app = express();

var server = require('http').Server(app);

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/views/welcome.html");
});

// Start your engines
server.listen(3000);
