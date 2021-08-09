const functions = require('firebase-functions');
const express = require('express');
const cors = require("cors");
const app = express();
const appRoutes = require("./apis")

const corseOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
}

app.use(cors(corseOptions));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

app.use("/api", appRoutes);

exports.app = functions.https.onRequest(app);
