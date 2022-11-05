const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const crypto = require("crypto");
const path = require("path");
const http = require("http");
const formidable = require("formidable");

app = express();
app.set("view engine", "ejs");

app.post("/form", function(req, res){

    console.log("Form");

    var formular = new formidable.IncomingForm();

    formular.parse(req, function(err, campuriText, campuriFisier){
        res.render("/pages/form");
    });
})

app.get("/*", function(req, res){
    res.render(__dirname + "/pages/home.ejs", {ip: req.ip});
});

app.listen(8080, function(){
   console.log("Server started listening localhost: " + 8080); 
});
