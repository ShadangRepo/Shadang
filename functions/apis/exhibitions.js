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
            let exhibitionDetails = { ...body }
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
    res.send({ success: true, data: [] })
});

module.exports = router;