const express = require("express");
const http = require("http");

app = express();

app.get("/*", function(req, res){
    console.log(__dirname);
    //res.render("/pages/home");
});

app.listen(8080, function(){
   console.log("Server started listening localhost: " + 8080); 
});
