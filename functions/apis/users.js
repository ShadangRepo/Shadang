const express = require('express');
const dbHandler = require('../firebase-utils/dbHandler');
const constants = require('../utils/constants');
const TableName = constants.TableName;
const router = express.Router();

//users
router.get("/getUserDetails", async (req, res) => {
    try {
        if (req.decodedUser) {
            const response = await dbHandler.readDocBasedOnId(TableName.users, req.decodedUser.id);
            if (!response.success && response.message === constants.DocumentNotExistMessage) {
                res.send({ success: false, message: "User does not exist" });
            } else if (response.success && response.data) {
                delete response.data.password;
                response.data.createdAt = response.data.createdAt?.toDate();
                response.data.updatedAt = response.data.updatedAt?.toDate();
                res.send(response)
            } else {
                res.send(response)
            }
        } else {
            res.send({ success: false, message: "User details not found" })
        }
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
});

router.get("/userList", async (req, res) => {
    try {
        const response = await dbHandler.readAll(TableName.users);
        if (response.success && response.data) {
            let formattedResponse = [];
            response.data.forEach(user => {
                delete user.password;
                user.createdAt = user.createdAt?.toDate()
                user.updatedAt = user.updatedAt?.toDate()
                formattedResponse.push(user);
            })
            res.send({ success: true, data: formattedResponse })
        } else {
            res.send(response)
        }
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
});

router.put("/updateProfile", async (req, res) => {
    try {
        let user = req.decodedUser;
        let body = req.body;
        if (!body.email) {
            res.send({ success: false, message: "Email is required" });
        } else if (!body.contact) {
            res.send({ success: false, message: "Contact is required" })
        } else if (!body.firstName) {
            res.send({ success: false, message: "First name is required" })
        } else if (!body.lastName) {
            res.send({ success: false, message: "Last name is required" })
        } else {
            delete body.createdAt;
            delete body.updatedAt;
            const updateResponse = await dbHandler.update(TableName.users, user.id, body);
            res.send(updateResponse);
        }
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
});

module.exports = router;