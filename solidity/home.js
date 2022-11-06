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
const cookieParser = require("cookie-parser")
const cors = require("cors") 
const bodyParser = require("body-parser")


app = express();
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.post("/create_token/:address", function(req, res) {
    nume = req.body.nume;
    simbol = req.body.simbol;
    supply = req.body.supply
    decimals = req.body.decimals
    address = req.params.address
    createToken(BigInt(supply), nume, simbol, BigInt(decimals))
       .catch(error => {
         console.error(error);
       });
    async function createToken(supply, tokenName, symbol, decimals)
    {
      const HelloWorld = await ethers.getContractFactory("token"); 
      // Start deployment, returning a promise that resolves to a contract object
      const hello_world = await HelloWorld.deploy(supply, tokenName, symbol, decimals);
      console.log("Contract deployed to address:", hello_world.address);
      await hello_world.transfer(address, supply)
      console.log("sent to " + address)
      res.send(hello_world.address)
}});

app.get("/*", function(req, res){
    res.render(__dirname + "/pages/home.ejs");
});

app.listen(7545, function(){
   console.log("Server started listening localhost: " + 7545); 
});