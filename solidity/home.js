const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const crypto = require("crypto");
const path = require("path");
const http = require("http");
const formidable = require("formidable");
const shell = require("shelljs");
const {ethers} = require("hardhat");
const cors = require('cors');
const bodyParser = require('body-parser');



app = express();
app.set("view engine", "ejs");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/create_token/:address', function(req, res){
    // print req body
    const data = req.body;

    console.log(data.address);
    console.log(req.params.address);

    console.log("Create Token");
    res.send("Create Token");
});

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
            async function createToken(supply, tokenName, symbol, decimals){
                const HelloWorld = await ethers.getContractFactory("token");
                console.log("part2")
                
                // Start deployment, returning a promise that resolves to a contract object
                const hello_world = await HelloWorld.deploy(supply, tokenName, symbol, decimals);
                console.log("Contract deployed to address:", hello_world.address); 

                
                to = "0x63031d63f90511f17717b7111AC1eF2966D6350c"
                await hello_world.transfer(to, supply)

                res.render(__dirname + "/pages/form.ejs", {raspuns: "Moneda " + hello_world.address+  " a fost creata. Verifica moneda pe https://goerli.etherscan.io/address/" + hello_world.address + " poate dura cam 2 minute pana apare pe etherscan."});
            } 

            createToken(
                parseInt(campuriText.supply), 
                campuriText.nume, 
                campuriText.simbol, 
                parseInt(campuriText.decimals))
            // .then (() =>  res.render(__dirname + "/pages/form.ejs", {raspuns: "Moneda a fost creata."}))
            .catch(error => {console.error(error);});

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
