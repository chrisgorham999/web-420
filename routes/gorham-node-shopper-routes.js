/*
======================================
; Title: gorham-node-shopper-routes.js 
; Author: Chris Gorham
; Date: 24 Apr 2023
; Description: This code is for the NodeSecurity Week 6 Project in Web420
; Sources Used:  N/A
;=====================================
*/

// imports
const express = require("express");
const router = express.Router();
const Customer = require("../models/gorham-customer");

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     name: createCustomer
 *     summary: Creates a new Customer document
 *     requestBody:
 *       description: Customer Information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB Atlas
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/customers', async(req, res) => {
    try {
        const newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
        };

        await Customer.create(newCustomer, function(err, customer) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(customer);
                res.json(customer);
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
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     name: createInvoiceByUserName
 *     description: API for creating a new invoice by username
 *     summary: Create a new invoice by username
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: The username that creates a new invoice 
 *         schema: 
 *           type: string
 *     requestBody:
 *       description: The invoice information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               subtotal:
 *                 type: string
 *               tax:
 *                 type: string
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          price: 
 *                              type: number
 *                          quantity:
 *                              type: number
 *     responses:
 *       '200':
 *         description: Customer invoice added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/customers/:username/invoices', async (req, res) => {
    try {
        await Customer.findOne({'userName': req.params.username}, 
        function(err, customer){
            let newInvoice= {
                subtotal: req.body.subtotal,
                tax: req.body.tax,
                dateCreated: req.body.dateCreated,
                dateShipped: req.body.dateShipped,
                lineItems: req.body.lineItems
            };

            if (err){
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}` 
                })
            } else{
                customer.invoices.push(newInvoice);

                customer.save(function(err, Customer){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(Customer);
                        res.json(Customer); 
                    }
                })
            }
        })
    }catch(e){
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
 });

module.exports = router;