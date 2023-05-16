const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "crud"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) =>{
    const sqlGet = "select * from contact_crud";
    db.query(sqlGet, (error, result) =>{
        res.send(result);
    })
})

app.get("/", (req, res) => {
    // const sqlInsert = "insert into contact_crud(name, email, contact) value('john', 'john@gmail.com', 9812345678)";
    // db.query(sqlInsert, (error, result) =>{
    //     console.log("error", error);
    //     console.log("result", result);
    //     res.send("Hello Express");
    // });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000.");
})