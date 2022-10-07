const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:'root',
    host: 'localhost',
    password: '',
    database : 'crud_db'
});

app.post('/create', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(' INSERT INTO login (username, password) VALUES (?,?)', 
    [username, password], (err,result) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send("Values Inserted");
        }
    }
    );
});

app.get('/users', (req, res)=>{
    db.query("SELECT * FROM login", (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.put('/update', (req,res)=>{
    const id = req.body.id;
    const password = req.body.password;
    db.query("UPDATE login SET password=? WHERE id=?",[password, id], 
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM login WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.listen(5000, () => {
    console.log("Server up and running");
});