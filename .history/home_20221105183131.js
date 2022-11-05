const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const formidable = require("formidable");
const crypto = require("crypto");
const path = require("path");
const helmet = require("helmet");
const http = require("http");

app = express();
app.set("view engine", "ejs");

app.get("/*", function(req, res){
    res.render(__dirname + "/pages/home.ejs", {ip: req.ip});
});

var formular = new formidable.IncomingForm();
 
formular.parse(req, function(err, campuriText, campuriFile){
    
    var criptareParola = crypto.scryptSync(campuriText.parola, parolaServer, 64).toString('hex');

    var queryUpdate = `update utilizatori 
                        set nume = $1, 
                            prenume = $2, 
                            email = $3,
                            culoare_chat = $4
                        where parola = $5;`;
        res.render("pagini/profil", {text: "Update-ul s-a realizat cu succes."});

    });
    
});

app.listen(8080, function(){
   console.log("Server started listening localhost: " + 8080); 
});
