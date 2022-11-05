const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const crypto = require("crypto");
const path = require("path");
const http = require("http");
const formidable = require("formidable");
const shell = require("shelljs");
const {ethers} = require("hardhat");

app = express();
app.set("view engine", "ejs");

app.get("/form", function(req, res){
    //console.log("Form");
    res.render(__dirname + "/pages/form.ejs");
})

app.post("/form", function(req, res){
    var formular = new formidable.IncomingForm();

    formular.parse(req, function(err, campuriText){
        
        var eroare = "";

        //console.log(campuriText.nume);

        if(campuriText.nume == ""){
            eroare += "Nume necompletat.";
        }

        if(!campuriText.nume.match(new RegExp("^[A-Za-z0-9]+$"))){
            eroare += "Numele nu corespunde patternului.";
        }

        if(!eroare){
            console.log("e bine")
            async function main(supply, tokenName, symbol, decimals) {
                console.log("part1")
                await createToken(supply, tokenName, symbol, decimals)
              }
              
              main(parseInt(campuriText.supply), campuriText.nume, campuriText.simbol, parseInt(campuriText.decimals))
               .then(() => process.exit(0))
               .catch(error => {
                 console.error(error);
                 //process.exit(1);
               });
              
              async function createToken(supply, tokenName, symbol, decimals)
              {
              const HelloWorld = await ethers.getContractFactory("token");
              console.log("part2")
              
              // Start deployment, returning a promise that resolves to a contract object
              const hello_world = await HelloWorld.deploy(supply, tokenName, symbol, decimals);
              console.log("Contract deployed to address:", hello_world.address);
              }
            res.render(__dirname + "/pages/form.ejs", {raspuns: "Moneda a fost creata."});
        }
        else{
            res.render(__dirname + "/pages/form.ejs", {err: "Eroare: " + eroare}); 
        }
    });
})

app.get("/*", function(req, res){
    res.render(__dirname + "/pages/home.ejs");
});

app.listen(8080, function(){
   console.log("Server started listening localhost: " + 8080); 
});
