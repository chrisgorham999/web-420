/*
======================================
; Title: gorham-session-routes.js 
; Author: Chris Gorham
; Date: 17 Apr 2023
; Description: This code is for the NodeSecurity Week 6 Project in Web420
; Sources Used:  N/A
;=====================================
*/

// imports
const express = require("express");
const router = express.Router();
const User = require("../models/gorham-user");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

/**
 * sign up
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - User
 *     description: API that creates a new username
 *     summary: Creates a new username
 *     requestBody:
 *       description: creation of username
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               email address:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Registered user
 *       '401': 
 *         description: Username is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/signup', async(req, res) => {
    try {
        let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password
        const newRegisteredUser = {
            userName: req.body.userName,
            password: hashedPassword,
            emailAddress: req.body.emailAddress,
        }

        await User.create(newRegisteredUser, function(err, password) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(password);
                res.json(password);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - User
 *     description: API for logging in
 *     summary: allows username to log in
 *     requestBody:
 *       description: log in
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User has successfully logged in
 *       '401':
 *         description: Invalid passId or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/login', async(req, res) => {
    try {
        User.findOne({ userName: req.body.userName }, function(err, user) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(user);
                if (user) {
                    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

                    if (passwordIsValid) {
                        console.log('User has successfully logged in');
                        res.status(200).send({
                            'message': 'Login successful!'
                        })
                    } else {
                        console.log('Invalid username/password');
                        res.status(401).send({
                            'message': `Invalid username/password`
                        })
                    }
                } else {
                    console.log('Invalid username/password');
                    res.status(401).send({
                        'message': `Invalid username/password`
                    })
                }
            }

            if (!user) {
                console.log("Invalid username/password");
                res.status(401).send({
                    message: `Invalid username/password`,
                });
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e}`
        })
    }
})

module.exports = router;