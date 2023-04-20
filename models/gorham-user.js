/*
======================================
; Title: gorham-user.js 
; Author: Chris Gorham
; Date: 17 Apr 2023
; Description: This code is for the NodeSecurity Week 6 Project in Web420
; Sources Used:  N/A
;=====================================
*/

// require statement for mongoose
const mongoose = require('mongoose');

// define new mongoose schema
const Schema = mongoose.Schema;

// defines the user schema
let userSchema = new Schema({    
    userName: { type: String },
    Password: { type: String },
    emailAddress: { type: String },
})

// exports the model
module.exports = mongoose.model('User', userSchema);