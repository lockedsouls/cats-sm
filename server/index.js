require("dotenv").config();
const express = require("express"); const app = express();
const mysql = require("mysql");
const Router = express.Router();
const authApi = require("./routes/authApi");

app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWRD,
    database: process.env.DB_NAME
})

db.connect(error => {
    console.log("Connected");
});

app.get("/balls", (req, res) => {
    db.query("SELECT * FROM test", (error, result) => {
        res.json(result);
    })
})

app.use("/api", authApi);

app.listen(3001, () => console.log("Listening on port 3001"));