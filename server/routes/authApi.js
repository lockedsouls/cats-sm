const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");

const Users = require("../db/users.json");

Router.route("/auth")
    .post((req, res) => {
        const {username, password} = req.body;

        if (!username || !password) return res.status(403).json({
                message: "Forbidden"
        });

        Users.forEach(user => {
            if (user.username == username) bcrypt.compare(password, user.password, error => {
                if (error) return res.status(403).json({
                        message: "Forbidden"
                });
                
                const token = jwt.sign({id: user.id, username: user.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "12h"});
        
                return res.status(200).json({
                    message: "Successfully logged in",
                    accessToken: token
                });
            })
        })

    })

Router.route("/register")
    .post((req, res) => {
        const {username, password} = req.body;

        if (!username || !password) return res.status(403).json({
                message: "Forbidden"
        });

        //check if user exists
        if (Users.find(user => user.username == username)) return res.status(403).json({
            message: "User already exists"
        });

        //hash password
        bcrypt.hash(password, 10, (error, hash) => {
            if (error) return res.status(500).json({
                message: "An error has occured"
            });
            
            Users.push({
                id: Users[Users.length-1].id + 1,
                username,
                password: hash
            });
            //update db
            fs.writeFile("./db/users.json", JSON.stringify(Users, null, 4), (error) => {
                if (error) return res.status(500).json({
                    message: "An error has occured"
                });

                return res.status(200).json({
                    message: "Successfully registred"
                })
            });
        })
    });

module.exports = Router;