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
        }

        res.render("/pages/form");
        

        // formular.on("field", function(nume, val){
        //     // 1 - ordine de executare
        //     // orice camp de tip text, cand il primeste

        //     if(nume == "username")
        //         username = val;

        // })

        // formular.on("fileBegin", function(nume, fisier){
        //     // 2 - ordine de executare
        //     // cand incepe update / incarcarea 
           
        //     caleUtiliz = path.join(__dirname, "poze_uploadate", username);
        //     if(!fs.existsSync())
        //         fs.mkdirSync(caleUtiliz);

        //     fisier.filepath = path.join(caleUtiliz, fisier.originalFilename);

        // })  

        // formular.on("file", function(nume, fisier){
        //     // 3 - ordine de executare
        //     // cand s-a terminat incarcarea
        // });
    
    });
})

app.get("/*", function(req, res){
    res.render(__dirname + "/pages/home.ejs", {ip: req.ip});
});

app.listen(8080, function(){
   console.log("Server started listening localhost: " + 8080); 
});
