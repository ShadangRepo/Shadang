const express = require('express');
const dbHandler = require('../firebase/dbHandler');
const constants = require('../utils/constants');
const { encryptPassword, checkPassword } = require('../utils/encryption');
const TableName = constants.TableName;
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    let body = req.body;
    try {
        if (!body.email) {
            res.send({ success: false, message: "Email is required" });
        } else if (!body.password) {
            res.send({ success: false, message: "Password is required" })
        } else {
            const response = await dbHandler.conditionBassedReadOne(TableName.users, "email", "==", body.email)
            if (response.success && response.data) {
                let passwordMatched = await checkPassword(body.password, response.data.password)
                if (passwordMatched) {
                    delete response.data.password;
                    const token = jwt.sign(
                        response.data,
                        constants.TOKEN_KEY,
                        {
                            expiresIn: "1h",
                        }
                    );
                    response.data.token = token
                    res.send(response)
                } else {
                    res.status(403).send({ success: false, message: "Invalid password" })
                }
            } else {
                res.send(response)
            }

        }
    } catch (error) {
        res.status(400).send({ success: false, message: error })
    }
})

router.post("/signup", async (req, res) => {
    try {
        let body = req.body;
        if (!body.email) {
            res.send({ success: false, message: "Email is required" });
        } else if (!body.contact) {
            res.send({ success: false, message: "Contact is required" })
        } else if (!body.firstName) {
            res.send({ success: false, message: "First name is required" })
        } else if (!body.lastName) {
            res.send({ success: false, message: "Last name is required" })
        } else if (!body.password) {
            res.send({ success: false, message: "Password is required" })
        } else {
            body.password = await encryptPassword(body.password)
            const response = await dbHandler.create(TableName.users, body)
            res.send(response)
        }
    } catch (error) {
        res.status(400).send({ success: false, message: error })
    }
})

module.exports = router;