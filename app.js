/*
======================================
; Title: app.js 
; Author: Chris Gorham
; Date: 13 March 2023
; Description: This code sets up WEB420 RESTful APIs project app
; Sources Used:  N/A
;=====================================
*/

"use-strict";

// defines our import requirements
const express = require('express');
const http = require('http');
const swaggerUiExpress = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');

// use express as the app
const app = express();

// holds server port value
app.set('port', process.env.PORT || 3000);


// tells the app what to use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// object literal
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], // files containing annotations for the OpenAPI Specification
};

// creates a new variable and calls the swaggerJsdoc library using the options object literal
const openapiSpecification = swaggerJsdoc(options);

// wires the openapispecification variable to the app variable
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(openapiSpecification));

// uses the http library to create a port and log to the console the port that is being listened to based on our port variable in the app
http.createServer(app).listen(app.get('port'), function() {
    console.log(`Application started and listening on port ${app.get('port')}`);
});
