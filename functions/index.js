const functions = require('firebase-functions');
const express = require('express');
const cors = require("cors");
const app = express();
const appRoutes = require("./apis")

app.use(cors())

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json())

app.use("/api", appRoutes);

exports.app = functions.https.onRequest(app);
