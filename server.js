var express = require("express");
var exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
var request = require('request');

const cheerio = require('cheerio')
const $ = cheerio.load('<h2 class="title">Hello world</h2>')

var mongojs = require('mongojs')
var db = mongojs(connectionString, [collections])


app.use(bodyParser.urlencoded({ extended: true }));
  // parse application/json
app.use(bodyParser.json());






require("./routes/api-routes.js")(app);







app.listen(3000, function() {
  console.log("App running on port 3000!");
});