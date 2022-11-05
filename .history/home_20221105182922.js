const express = require("express");
const fs = require("fs");
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

        client.query(queryUpdate, [campuriText.nume, campuriText.prenume, campuriText.email, campuriText.culoare_chat, criptareParola], function(err, rez){
    
            if(err){
                console.log(err);
                res.render("pagini/eroare_generala", {text: "Eroare baza date. Incercati mai tarziu."});
                return;
            }

            console.log(rez.rowCount);

            if (rez.rowCount == 0){
                res.render("pagini/profil", {text: "Update-ul nu s-a realizat. Verificati parola introdusa."});
                return;
            }
            else{
                req.session.utilizator.nume = campuriText.nume;
                req.session.utilizator.prenume = campuriText.prenume;
                req.session.utilizator.email = campuriText.email;
                req.session.utilizator.culoare_chat = campuriText.culoare_chat;
            }
            
            res.render("pagini/profil", {text: "Update-ul s-a realizat cu succes."});
 
        });
       
    });

app.listen(8080, function(){
   console.log("Server started listening localhost: " + 8080); 
});
