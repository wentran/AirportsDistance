var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var index = require('./routes');
var cors = require("cors");
var http = require('http');



/* Initialize the server */
var app = express();
var server = http.Server(app);



app.use("/", express.static(__dirname + "/client/"));
app.use(cors());
app.get('/airports', index.airports);



server.listen(process.env.PORT || 8000);
console.log('success!!!');

module.exports = server;
