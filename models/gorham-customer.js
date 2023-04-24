/*
======================================
; Title: gorham-customer.js 
; Author: Chris Gorham
; Date: 24 Apr 2023
; Description: This code is for the NodeShopper Week 7 Project in Web420
; Sources Used:  N/A
;=====================================
*/

// require statement for mongoose
const mongoose = require('mongoose');

// define new mongoose schema
const Schema = mongoose.Schema;

// defines the line item schema
let lineItemSchema = new Schema({    
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
})

// defines the invoice schema
let invoiceSchema = new Schema({    
    subtotal: { type: Number },
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [lineItemSchema],
})

// defines the customer schema
let customerSchema = new Schema({    
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    invoices: [invoiceSchema],
})

// exports the model
module.exports = mongoose.model("Customer", customerSchema);