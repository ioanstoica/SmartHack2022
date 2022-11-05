const express = require("express");
const fs = require("fs");
const ejs = require("ejs");

const crypto = require("crypto");
const path = require("path");
// const helmet = require("helmet");
const http = require("http");

// const formidable = require("formidable");

app = express();
app.set("view engine", "ejs");

app.get("/*", function(req, res){
    res.render(__dirname + "/pages/home.ejs", {ip: req.ip});
});

// var formular = new formidable.IncomingForm();
 
// formular.parse(req, function(err, campuriText, campuriFile){

// });

app.listen(8080, function(){
   console.log("Server started listening localhost: " + 8080); 
});
