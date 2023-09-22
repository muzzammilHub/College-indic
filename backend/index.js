const dotenv = require("dotenv").config({path: 'backend/config/config.env'});
// importing express
const express = require('express')
const app = express()
// importing cookie-parser for handling cookie
const cookieParser = require('cookie-parser');

// using as a middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

//importing route
const userRoute = require("./routes/user");

// using route
app.use("/api/v1", userRoute);

// exporting
module.exports = app;