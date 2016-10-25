var express = require("express");
// var session = require("express-session");
var bodyParser = require("body-parser");
var cors = require("cors");


/* Initialize the server */
var app = express();




app.use("/", express.static(__dirname + "/client/"));

app.use(bodyParser.json())
app.use(cors());





app.listen(process.env.PORT || 8000);
module.exports = app;






