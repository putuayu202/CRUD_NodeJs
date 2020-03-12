var express = require('express'),
app = express(),
bodyParser = require('body-parser');
var mysql = require('mysql');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
  });

app.get('/', function (req, res) {
    res.end('Hello World')
})

app.get('/api/all',(req, res) => {
    let sql = "SELECT * FROM data";
    let query = con.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

app.get('/api/detail/:id',(req, res) => {
    let sql = "SELECT * FROM data WHERE id="+req.params.id;
    let query = con.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

app.post('/api/insert', function(req,res){
    var snapshot=req.body;
    var first_name=""; 
    var last_name=""; 
    if (snapshot.first_name !=null){first_name=snapshot.first_name}
    if (snapshot.last_name !=null){last_name=snapshot.last_name}

    var sql = "INSERT INTO data (first_name, last_name) VALUES ('"+first_name+"','"+last_name+"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted, ID: " + result.insertId);
    });
    res.send('1 record inserted')
})

app.put('/api/update/:id', function(req,res){
    var snapshot=req.body;
    var first_name=""; 
    var last_name=""; 
    if (snapshot.first_name !=null){first_name=snapshot.first_name}
    if (snapshot.last_name !=null){last_name=snapshot.last_name}

    var sql = "UPDATE data SET first_name = '"+first_name+"', last_name = '"+last_name+"' WHERE id = "+req.params.id;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record update, ID: " + result.insertId);
    });
    res.send('1 record update')
})

app.delete('/api/delete/:id', function(req,res){
    var sql = "DELETE FROM data WHERE id = "+req.params.id;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted, ID: ");
    });
    res.send('1 data telah masuk')
})



app.listen(3000, '0.0.0.0');
console.log("Server is listening");
