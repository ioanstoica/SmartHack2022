const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const crypto = require("crypto");
const path = require("path");
const http = require("http");
const formidable = require("formidable");

app = express();
app.set("view engine", "ejs");

app.get("/newcoin", function(req, res){
    //console.log("Form");
    res.render(__dirname + "/pages/form.ejs");
})

app.post("/form", function(req, res){
    var formular = new formidable.IncomingForm();

    formular.parse(req, function(err, campuriText, campuriFisier){
        
        var eroare = "";

        if(campuriText.name == ""){
            eroare += "Nume necompletat.";
        }
        
        if(!campuriText.name.match(new RegExp("^[A-Za-z0-9]+$"))){
            eroare += "Numele nu corespunde patternului.";
        }

        if(!eroare)
            //res.redirect(__dirname + "/pages/home.ejs");
        else
            res.render("pages/inregistrare", {err: "Eroare: " + eroare});  
    });

    res.render(__dirname + "/pages/home.ejs")
})

app.get("/*", function(req, res){
    res.render(__dirname + "/pages/home.ejs");
});

app.listen(8080, function(){
   console.log("Server started listening localhost: " + 8080); 
});
