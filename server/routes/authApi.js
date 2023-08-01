const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db/db");

Router.route("/auth")
    .post((req, res) => {
        const {username, password} = req.body;
        console.log(username);

        if (!username || !password) return res.status(403).json({
                message: "Forbidden"
        });

        db.query(`SELECT * FROM users WHERE username='${username}'`, (error, data) => {
            const target = data[0];

            if (!target) return res.status(404).json({
                message: "User does not exist"
            });

            bcrypt.compare(password, target.password).then(matches => {
                if (!matches) return res.status(401).json({
                    message: "Passwords don't match"
                });

                const data = {
                    id: target.id,
                    username: target.username,
                    followers: target.followers
                }

                const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "8h"});

                return res.status(200).json({
                    message: "Successfully logged in",
                    data: data,
                    accessToken: accessToken
                })
            })
        });
    });

Router.route("/register")
    .post((req, res) => {
        const {username, password} = req.body;

        if (!username || !password) return res.status(403).json({
                message: "Forbidden"
        });

        //check if user exists
        db.query(`SELECT * FROM users WHERE username='${username}'`, (error, data) => {
            if (data[0]) return res.status(400).json({
                message: "User already exists",
                data: {username}
            });

            bcrypt.hash(password, 10, (error, hash) => {
                if (error) return res.status(500).json({
                    message: "An error has occured"
                });

                db.query(`INSERT INTO users(username, password, followers) VALUES('${username}', '${hash}', 0)`, (error, record) => {
                    if (error) return res.status(500).json({
                        message: "An error has occured",
                        error
                    });

                    return res.status(200).json({
                        message: "Successfully logged in",
                        data: {
                            id: record.insertId,
                            username: username,
                            followers: 0
                        }
                    })
                });
            })
        })
    });

module.exports = Router;