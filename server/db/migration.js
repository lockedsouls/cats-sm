const express = require("express");
const Router = express.Router();
const db = require("./db");

Router.post("/t2N6gjA7vUwF/q3PKABJh6cKL/migrate", (req, res) => {
    const usersSql = `
    CREATE TABLE Users(
        id int PRIMARY KEY AUTO_INCREMENT,
        username varchar(50) NOT NULL,
        password varchar(255) NOT NULL,
        followers int DEFAULT 0
    )`;

    db.query(usersSql, (error, response) => {
        if (error) res.status(500).json({
            message: error.message
        });
    })
});


module.exports = Router;