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
const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require("mongoose");
const composerAPI = require("./routes/gorham-composer-routes");
const personAPI = require("./routes/gorham-person-routes");
const userAPI = require("./routes/gorham-session-routes");
const nodeShopperAPI = require("./routes/gorham-node-shopper-routes");

// use express as the app
let app = express();

// holds server port value
app.set("port", process.env.PORT || 3000);


// tells the app what to use
app.use(express.json());
app.use(express.urlencoded({"extended": true }));

// mongoose connection address
const conn = "mongodb+srv://web420_user:s3cret@bellevueuniversity.up6klva.mongodb.net/web420DB";

// displays connection success or error messages
mongoose
  .connect(conn, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Connection to web420DB on MongoDB Atlas successful`);
  })
  .catch((err) => {
    console.log(`MongoDB Error: ${err.message}`);
  });



// object literal
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "WEB 420 RESTful APIs",
        version: "1.0.0",
      },
    },
    apis: ["./routes/*.js"], //files containing annotations for the OpenAPI Specification
  };
  
  // assigning a variable to call swaggerJsdoc
  const openapiSpecification = swaggerJsdoc(options);
  
  // wire openapiSpecification to app variable
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/api", composerAPI);
app.use("/api", personAPI);
app.use("/api", userAPI);
app.use("/api", nodeShopperAPI);

// uses the http library to create a port and log to the console the port that is being listened to based on our port variable in the app
http.createServer(app).listen(app.get("port"), function() {
    console.log(`Application started and listening on port ${app.get("port")}`);
});
