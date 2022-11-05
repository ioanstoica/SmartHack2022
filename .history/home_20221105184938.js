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
    var formular = new formidable.IncomingForm();

    formular.parse(req, function(err, campuriText, campuriFisier){
        
        var username;
        var eroare = "";
        
        if(campuriText.username == ""){
            eroare += "Username necompletat. ";
        }
        
        if(!campuriText.username.match(new RegExp("^[A-Za-z0-9]+$"))){
            eroare += "Username nu corespunde patternului. ";
        }

        if(!eroare){
            // queryUtiliz = `select username from utilizatori where username = $1`;
            // client.query(queryUtiliz, [campuriText.username], function(err, rezUtiliz){
            //     if(rezUtiliz.rows.length != 0){
            //         eroare += "Username-ul mai exista. ";
            //         res.render("pagini/inregistrare", {err: "Eroare: " + eroare});
            //     }
            //     else{
            //         var parolaCriptata = crypto.scryptSync(campuriText.parola, parolaServer, 64).toString("hex");
            //         let token = genereazaToken(100);
            //         var comandaInserare = `insert into utilizatori (username, nume, prenume, parola, email, data_adaugare, culoare_chat, cod) values 
            //                                 ($1, $2, $3, $4, $5, $6, $7, $8)`;
            //         client.query(comandaInserare, [campuriText.username, campuriText.nume, campuriText.prenume, parolaCriptata, campuriText.email, new Date(), campuriText.culoare_chat, token], function(err, rezInserare){
            //             if(err){
            //                 console.log(err);
            //                 res.render("pagini/inregistrare", {err: "Eroare baza de date."});
            //             }
            //             else{
            //                 res.render("pagini/inregistrare", {raspuns: "Datele au fost introduse."});
            //                 let linkConfirmare = `${obGlobal.protocol}${obGlobal.numeDomeniu}/cod/${campuriText.username}/${token}`;
            //                 trimiteMail(campuriText.email, "Te-ai inregistrat!", "Text", `<p style='color:blue'>Username-ul tau este '${campuriText.username}'.</p>
            //                             <a href=${linkConfirmare}>Link confirmare</a>`);
            //             }
            //         })   
            //     }
            // })

            res.render("/pages/form");            
        }
        else{
            res.render("pages/home));
        }

        formular.on("field", function(nume, val){
            // 1 - ordine de executare
            // orice camp de tip text, cand il primeste

            if(nume == "username")
                username = val;

        })

        formular.on("fileBegin", function(nume, fisier){
            // 2 - ordine de executare
            // cand incepe update / incarcarea 
           
            caleUtiliz = path.join(__dirname, "poze_uploadate", username);
            if(!fs.existsSync())
                fs.mkdirSync(caleUtiliz);

            fisier.filepath = path.join(caleUtiliz, fisier.originalFilename);

        })  

        formular.on("file", function(nume, fisier){
            // 3 - ordine de executare
            // cand s-a terminat incarcarea
        });
    
    });
})

app.get("/*", function(req, res){
    res.render(__dirname + "/pages/home.ejs", {ip: req.ip});
});

app.listen(8080, function(){
   console.log("Server started listening localhost: " + 8080); 
});
