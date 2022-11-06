const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const crypto = require("crypto");
const path = require("path");
const http = require("http");
const formidable = require("formidable");
const shell = require("shelljs");
const {ethers} = require("hardhat");
const ethers2 = require("ethers")
const metamask = require("@metamask/detect-provider");

// const provider = await detectEthereumProvider();

app = express();
app.set("view engine", "ejs");

// detectEthereumProvider = metamask.detectEthereumProvider;

// const provider = await detectEthereumProvider();
// if (global.ethereum == "undefined") {
//     console.log("Eroare");
// }
// else {
//     const provider = new ethers.providers.Web3Provider(global.ethereum)
// }   
// if (provider) {
//     // From now on, this should always be true:
//     // provider === window.ethereum
//     startApp(provider); // initialize your app
//   } else {
//     console.log('Please install MetaMask!');
//   }

// console.log(ethereum.isConnected());    

// ethereum
//   .request({ method: 'eth_accounts' })
//   .then((accounts) => {
//     console.log(`Accounts:\n${accounts.join('\n')}`);
//   })
//   .catch((error) => {
//     console.error(
//       `Error fetching accounts: ${error.message}.
//        Code: ${error.code}. Data: ${error.data}`
//     );
//   });

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
              
              main(BigInt(campuriText.supply), campuriText.nume, campuriText.simbol, BigInt(campuriText.decimals))
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



app.listen(7545, function(){
   console.log("Server started listening localhost: " + 7545); 
});

console.log(global.ethereum);
if (typeof global.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }