const express = require("express");
const fs = require("fs");
const http = require("http");

app = express();
app.set("view engine", "ejs");

app.get("/*", function(req, res){
    console.log("Aici");
    //res.render("/pages/home");
});

app.listen(8080, function(){
   console.log("Server started listening localhost: " + 8080); 
});