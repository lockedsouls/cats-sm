const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db/db");

const userController = require("../db/controllers/userController")

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (error, hash) => {
            if (error) return reject(error);
            resolve(hash);
        })
    })
}

const comparePasswords = (password, hashedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword).then(matches => {
            if (!matches) return reject("Passwords don't match");
            resolve();
        })
    })
}

Router.route("/auth")
    .post(async (req, res) => {
        const {username, password} = req.body;

        if (!username || !password) return res.status(403).json({
                message: "Forbidden"
        });
        
        try{
            const user = (await userController.getUserByColumn("username", username))[0];
            if (!user) throw "User does not exist";

            await comparePasswords(password, user.password);

            const payload = {
                id: user.id,
                username: user.username,
                followers: user.followers
            }
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "8h"});

            return res.status(200).json({
                message: "Successfully logged in",
                data: payload,
                accessToken: accessToken
            })
        }catch(error){
            return res.status(401).json({
                message: error.message || error
            })
        }
    });

Router.route("/register")
    .post(async (req, res) => {
        const {username, password} = req.body;

        if (!username || !password) return res.status(403).json({
                message: "Forbidden"
        });

        try{
            //check if user exists
            const user = (await userController.getUserByColumn("username", username))[0];

            if (user) return res.status(409).json({
                message: "User already exists"
            });

            const hashedPassword = await hashPassword(password);
            const record = await userController.insertIntoUsers({
                username: username,
                password: hashedPassword
            });

            return res.status(200).json({
                message: "Successfully registred",
                data: {
                    id: record.insertId,
                    username: username,
                    followers: 0
                }
            })
        }catch(error){
            return res.status(401).json({
                message: error.message || error
            });
        }
    });

module.exports = Router;