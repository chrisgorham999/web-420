/*
======================================
; Title: gorham-person.js 
; Author: Chris Gorham
; Date: 10 Apr 2023
; Description: This code is for the Person's API in Web420
; Sources Used:  N/A
;=====================================
*/

// require statement for mongoose
const mongoose = require('mongoose');

// define new mongoose schema
const Schema = mongoose.Schema;

// defines the role schema
let roleSchema = new Schema({    
    text: { type: String }
})

// defines the dependent schema
let dependentSchema = new Schema({    
    firstName: { type: String },
    lastName: { type: String }
})

// defines the person schema
let personSchema = new Schema({    
    firstName: { type: String },
    lastName: { type: String },
    roles: [roleSchema],
    dependents:  [dependentSchema],
    birthDate: { type: String }
})

// exports the model
module.exports = mongoose.model('Person', personSchema);