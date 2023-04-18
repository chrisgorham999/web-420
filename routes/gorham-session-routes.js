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
 *       - Passwords
 *     name: register
 *     summary: Register password
 *     requestBody:
 *       description: Password information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - password
 *             properties:
 *               password:
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
        const newPassword = {
            passId: uuidv4(),
            pass: hashedPassword
        }

        await User.create(newPassword, function(err, password) {
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
            'message': `Server Excpetion: ${e.message}`
        })
    }
})

/**
 * verify-password
 * @openapi
 * /api/verify-password:
 *   post:
 *     tags:
 *       - Passwords
 *     name: verify password
 *     summary: Verifies a password
 *     requestBody:
 *       description: Password information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - passId
 *               - password
 *             properties:
 *               passId:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password added to MongoDB
 *       '401':
 *         description: Invalid passId or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/verify-password', async(req, res) => {
    try {
        Password.findOne({'passId': req.body.passId}, function(err, password) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(password);
                if (password) {
                    let passwordIsValid = bcrypt.compareSync(req.body.password, password.pass);

                    if (passwordIsValid) {
                        console.log('Password matches');
                        res.status(200).send({
                            'message': 'Password matches'
                        })
                    } else {
                        console.log('Password is incorrect');
                        res.status(401).send({
                            'message': `Invalid passId or password`
                        })
                    }
                } else {
                    console.log('Invalid passId');
                    res.status(401).send({
                        'message': `Invalid passId or password`
                    })
                }
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