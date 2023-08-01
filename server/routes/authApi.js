const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");

Router.route("/auth")
    .post((req, res) => {
        const {username, password} = req.body;

        if (!username || !password) return res.status(403).json({
                message: "Forbidden"
        });

        //loop through users to find the target user
        Users.forEach(user => {
            if (user.username == username) bcrypt.compare(password, user.password, error => {
                //if passwords don't match, return 403
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

    });

Router.route("/register")
    .post((req, res) => {
        const {username, password} = req.body;

        if (!username || !password) return res.status(403).json({
                message: "Forbidden"
        });

        //check if user exists

        //hash password
        bcrypt.hash(password, 10, (error, hash) => {
            if (error) return res.status(500).json({
                message: "An error has occured"
            });
            //update db
            res.send(hash);
        })
    });

module.exports = Router;