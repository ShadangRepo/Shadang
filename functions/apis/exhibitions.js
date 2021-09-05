const express = require('express');
const dbHandler = require('../firebase/dbHandler');
const constants = require('../utils/constants');
const TableName = constants.TableName;
const router = express.Router();
const verifyToken = require('../middleware/auth');

router.post("/create", verifyToken, async (req, res) => {
    let body = req.body;
    try {
        if (!body.title) {
            res.send({ success: false, message: "Title is required" });
        } else if (!body.startDate) {
            res.send({ success: false, message: "Start date is required" })
        } else if (!body.endDate) {
            res.send({ success: false, message: "End date is required" })
        } else {
            const response = await dbHandler.create(TableName.exhibitions, body)
            if (response.success) {
                res.send({ success: true, message: "Exhibition created successfully" });
            } else {
                res.send(response);
            }
        }
    } catch (error) {
        res.send({ success: false, message: error })
    }
});

module.exports = router;