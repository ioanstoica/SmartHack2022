const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const crypto = require("crypto");
const path = require("path");
const http = require("http");
const formidable = require("formidable");

// import solidity 
const { ethers } = require("hardhat");
// const { createToken } = require("./scripts/deploy.js");

app = express();
app.set("view engine", "ejs");

app.get("/form", function(req, res){
    //console.log("Form");
    res.render(__dirname + "/pages/form.ejs");
})

app.post("/form", function(req, res){
    var formular = new formidable.IncomingForm();

    formular.parse(req, function(err, campuriText, campuriFisier){
        
        var eroare = "";

        //console.log(campuriText.nume);

        if(campuriText.nume == ""){
            eroare += "Nume necompletat.";
        }

        if(!campuriText.nume.match(new RegExp("^[A-Za-z0-9]+$"))){
            eroare += "Numele nu corespunde patternului.";
        }

        if(!eroare){
            
            
async function createToken(supply, tokenName, symbol, decimals)
{
const HelloWorld = await ethers.getContractFactory("token");
console.log("part1")

// Start deployment, returning a promise that resolves to a contract object
const hello_world = await HelloWorld.deploy(supply, tokenName, symbol, decimals);
console.log("Contract deployed to address:", hello_world.address);
}

async function main2() {
    await createToken(10000000000, campuriText.nume, campuriText.simbol, 10)
}

main2()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
//    process.exit(1);
 });


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
