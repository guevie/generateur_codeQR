const { json } = require("express");
const express = require("express");
require("dotenv").config({ path: "./config/.env" }); //importer le .env
const ejs = require("ejs");
const path = require("path");
const qrcode = require("qrcode");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.get("/", (req, res, next) => {
  res.render("index");
});

app.post("/scan", (req, res, next) => {
  const input_text = req.body.text;
  const input_text2 = req.body.text1;
  const input_text3 = req.body.text2;
  //const space = " "; 
  const input = input_text + " " + input_text2 + " " + input_text3;
  // Converting the data into String format
  let stringdata = JSON.stringify(input);
  let stringdata1 = JSON.stringify(input);
  console.log(stringdata);

  // Print the QR code to terminal
  qrcode.toString(stringdata, { type: "terminal" }, function (err, qrcode) {
    if (err) return console.log("une erreur est survenue");

    // Printing the generated code
    console.log(qrcode);
  });
  qrcode.toDataURL(stringdata, (err, src) => {
    if (err) return console.log("une erreur est survenue");
    res.render("scan", {
      qr_code: src,
    });
    console.log(src);
    console.log(stringdata);
  });
  
  //enregistrer les données
});

// server
app.listen(process.env.PORT, () => {
  console.log(`Serveur lancé: http://localhost:${process.env.PORT}`);
});
