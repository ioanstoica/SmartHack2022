const express = require("express");
const fs = require("fs");
const http = require("http");

app = express();
app.set("view engine", "ejs");

app.get("/*", function(req, res){

    /res.send("Hello");
    res.render(__dirname + "/pages/home.ejs", {ip: req.ip});
});

app.listen(8080, function(){
   console.log("Server started listening localhost: " + 8080); 
});
