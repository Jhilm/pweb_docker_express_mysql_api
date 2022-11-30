const express = require("express");
const app = express();
var mysql = require("mysql");

let cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  var conexion = mysql.createConnection({
    host: "db",
    database: "pweb_pizarra",
    user: "root",
    password: "pwdRoot",
  });

  conexion.connect(function (err) {
    if (err) {
      console.error("Error de conexion: " + err.stack);
      return;
    }
    console.log("Conectado con el identificador " + conexion.threadId);
  });

  res.send("Holaasdfsaf");
});

app.get("/otro", function (req, res) {
  res.send("Holaasdfsaf");
});

app.post("/createImg", function (req, res) {
  var name = req.body.name;
  var data = req.body.data;

  let conn = connection();

  conn.query("SELECT * FROM images", function (error, results, fields) {
    if (error) throw error;

    results.forEach((result) => {
      console.log(result);
    });
  });
  conn.end();
  res.send("terminado");
});

app.post("/getAll", function (req, res) {
  let conn = connection();
  let images = [];
  conn.query("SELECT * FROM images", function (error, results) {
    if (error) throw error;

    results.forEach((result) => {
      images.push(result);
    });
    res.send(images);
  });
  console.log("cerrando coneecxion");
  conn.end();
});

app.listen(3000);

function connection() {
  var conexion = mysql.createConnection({
    host: "db",
    database: "pweb_pizarra",
    user: "root",
    password: "pwdRoot",
  });

  conexion.connect(function (err) {
    if (err) {
      console.error("Error de conexion: " + err.stack);
      return;
    }
    console.log("Conectado con el identificador " + conexion.threadId);
  });
  return conexion;
}