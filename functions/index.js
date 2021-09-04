const functions = require('firebase-functions');
const express = require('express');
const cors = require("cors");
const app = express();
const appRoutes = require("./apis")

var whitelist = ['https://www.shadang.in', 'https://shadang.in']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Origin blocked by CORS'))
        }
    }
}

app.use(cors(corsOptions));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

app.use("/api", appRoutes);

exports.app = functions.https.onRequest(app);
