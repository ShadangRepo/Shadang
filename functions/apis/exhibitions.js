const express = require('express');
const dbHandler = require('../firebase/dbHandler');
const constants = require('../utils/constants');
const TableName = constants.TableName;
const router = express.Router();
const verifyToken = require('../middleware/auth');
var moment = require('moment');

//exhibitions
router.post("/create", verifyToken, async (req, res) => {
    let body = req.body;
    let user = req.decodedUser;
    try {
        if (!body.title) {
            res.send({ success: false, message: "Title is required" });
        } else if (!body.startDate) {
            res.send({ success: false, message: "Start date is required" })
        } else if (!body.endDate) {
            res.send({ success: false, message: "End date is required" })
        } else {
            let exhibitionDetails = { ...body, createdBy: user.id, createdAt: moment().format("DD/MM/YYYY") }
            delete exhibitionDetails.images
            const response = await dbHandler.create(TableName.exhibitions, exhibitionDetails)
            if (response.success) {
                var formattedImages = body.images ? body.images.map(item => ({
                    ...item, exhibitionId: response.data.id
                })) : [];
                const createExhibitionImagesResponse = await dbHandler.batchCreate(TableName.exhibitionFiles, formattedImages)
                if (createExhibitionImagesResponse.success) {
                    res.send({ success: true, message: "Exhibition created successfully" });
                } else {
                    res.send({ success: true, message: "Exhibition created successfully, but error saving images" });
                }
            } else {
                res.send(response);
            }
        }
    } catch (error) {
        res.send({ success: false, message: error })
    }
});

router.get("/myExhibitions", verifyToken, async (req, res) => {
    let user = req.decodedUser;
    try {
        const response = await dbHandler.conditionBassedReadAll(TableName.exhibitions, "createdBy", "==", user.id);
        res.send(response)
    } catch (error) {
        res.send({ success: false, message: error })
    }
});

module.exports = router;