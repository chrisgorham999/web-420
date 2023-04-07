/*
======================================
; Title: gorham-composer.js 
; Author: Chris Gorham
; Date: 04 Apr 2023
; Description: This code is for the Composer API in Web420
; Sources Used:  N/A
;=====================================
*/

// require statement for mongoose
const mongoose = require('mongoose');

// define new mongoose schema
const Schema = mongoose.Schema;

// defines the composer schema
let composerSchema = new Schema({    
    firstName: { type: String },
    lastName: { type: String },
});

// exports the model
module.exports = mongoose.model('Composer', composerSchema);