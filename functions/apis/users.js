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

module.exports = router;