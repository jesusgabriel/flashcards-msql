var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var table = require('./todos.js');
var db = 'mongodb://localhost/todos';


mongoose.connect(db);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public_html'))

app.get('/todos', function(req, res){
table.find({}).exec(function(err, todos) {
  if (err) {
    console.log("The table not running");
  }else {
    console.log(todos);
    res.json(todos);
  }
})
});


app.post('/todos', function(req, res){
  var newtable = new table ();
    newtable.description = req.body.description,
    newtable.status= req.body.status,
    newtable.save(function (err, newtable) {
      if (err) {
        console.log('error has ocurred');
      }else {
      res.json(newtable)
      }
  })
});
// app.post('/todos', function(req, res) {
//   if (!req.body || !req.body.description || !req.body.status) {
//     return res.sendStatus(400);
//   }
//   var query = `INSERT INTO todos (description, status)
//       VALUES ('${req.body.description}', '${req.body.status}')`;
//       table.find(query, function(err, result){
//         if (err) {
//           console.log("Error writing todos: " + err.toString());
//           return res.sendStatus(500);
//         }
//         res.json(result);
//       });
// });
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
