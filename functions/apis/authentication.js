const express = require('express');
const dbHandler = require('../firebase/dbHandler');
const constants = require('../utils/constants');
const TableName = constants.TableName;
const router = express.Router();

router.post("/login", (req, res) => {
    res.send("login successful")
})

router.post("/signup", async (req, res) => {
    const body = req.body;
    const response = await dbHandler.create(TableName.users, body)
    res.send(response)
})

module.exports = router;