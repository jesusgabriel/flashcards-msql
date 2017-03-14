var express = require('express');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'todos'
});
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public_html'))

app.get('/todos', function(req, res){
  connection.query('SELECT * FROM todos', function(err, rows){
      if (err) {
        console.log("Error read table");
        return res.sendStatus(500);
      }
      res.json(rows);
    });
});


app.post('/todos', function(req, res) {
  if (!req.body || !req.body.description || !req.body.status) {
    return res.sendStatus(400);
  }
  var query = `INSERT INTO todos (description, status)
      VALUES ('${req.body.description}', '${req.body.status}')`;
      connection.query(query, function(err, result){
        if (err) {
          console.log("Error writing todos: " + err.toString());
          return res.sendStatus(500);
        }
        res.json(result);
      });
});
app.put('/todos', function(req, res){
    var UpSta = `UPDATE todos set description='${req.body.description}',
    status='${req.body.status}' where id='${req.body.id}'`;
    connection.query(UpSta, function(err, result){
      if (err) {
        console.log("Error updating todos: " + req.body.id);
        console.log(err.toString());
        return res.sendStatus(500);
      }
      res.json(result);
    });
  });














app.listen(9000);
