const express = require('express');
const dbHandler = require('../firebase/dbHandler');
const constants = require('../utils/constants');
const TableName = constants.TableName;
const router = express.Router();
const firebase = require("../firebase/firebaseConfig");
const moment = require("moment");

//exhibitions
router.post("/create", async (req, res) => {
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
            let exhibitionDetails = { ...body, createdBy: user.id };
            exhibitionDetails.startDate = firebase.firestore.Timestamp.fromDate(new Date(exhibitionDetails.startDate))
            exhibitionDetails.endDate = firebase.firestore.Timestamp.fromDate(new Date(exhibitionDetails.endDate))
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

router.get("/myExhibitions", async (req, res) => {
    let user = req.decodedUser;
    try {
        const response = await dbHandler.conditionBassedReadAll(TableName.exhibitions, "createdBy", "==", user.id);
        if (response.success && response.data) {
            response.data = response.data.map(item => ({
                ...item,
                startDate: item.startDate.toDate(),
                endDate: item.endDate.toDate(),
                createdAt: item.createdAt.toDate()
            }));
            res.send(response)
        } else {
            res.send(response)
        }

    } catch (error) {
        res.send({ success: false, message: error })
    }
});

router.get("/list", async (req, res) => {
    try {
        let currentDate = firebase.firestore.Timestamp.fromDate(new Date());
        const exhibitionResponse = await dbHandler.conditionBassedReadAll(TableName.exhibitions, "endDate", ">=", currentDate);
        if (exhibitionResponse.success) {
            let formattedExhibitions = exhibitionResponse.data.map(item => ({
                ...item,
                createdAt: item.createdAt.toDate(),
                endDate: item.endDate.toDate(),
                startDate: item.startDate.toDate()
            }))
            //get only files for those exhibitions, whose start date <= current dates
            let exhibitionsForFilter = formattedExhibitions.filter(item => moment(item.startDate).isSameOrBefore(moment()))
            let formattedExhibitionIds = exhibitionsForFilter.map(({ id }) => id);
            // get all documents which has exhibitionId present in formattedExhibitionIds
            const exhibitionFilesResponse = await dbHandler.conditionBassedReadAll(TableName.exhibitionFiles, "exhibitionId", "in", formattedExhibitionIds);
            const filteredFiles = exhibitionFilesResponse.data.filter(item => item.active);
            if (exhibitionFilesResponse.success) {
                res.send({ ...exhibitionFilesResponse, data: { exhibitions: formattedExhibitions, exhibitionFiles: filteredFiles } })
            } else {
                res.send({ ...exhibitionFilesResponse, data: { exhibitions: formattedExhibitions, exhibitionFiles: [] }, message: exhibitionFilesResponse.message })
            }
        } else {
            res.send(exhibitionResponse)
        }
    } catch (error) {
        res.send({ success: false, message: `${error}` })
    }
});

module.exports = router;