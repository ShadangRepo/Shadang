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
                startDate: item.startDate.toDate(),
                isLive: moment(item.startDate.toDate()).isSameOrBefore(moment())
            }))
            res.send({ ...exhibitionResponse, data: formattedExhibitions })
        } else {
            res.send(exhibitionResponse)
        }
    } catch (error) {
        res.send({ success: false, message: `${error}` })
    }
});

router.get("/items", async (req, res) => {
    try {
        if (req.query.exhibitionId) {
            const exhibitionResponse = await dbHandler.readDocBasedOnId(TableName.exhibitions, req.query.exhibitionId);
            if (!exhibitionResponse.success && exhibitionResponse.message === constants.DocumentNotExistMessage) {
                res.send({ success: false, message: "Invalid exhibition id" });
            } else if (exhibitionResponse.success && exhibitionResponse.data) {
                let exhibitionData = { ...exhibitionResponse.data };
                //check if exhibition is live
                if (moment(exhibitionData.startDate.toDate()).isSameOrBefore(moment()) && moment(exhibitionData.endDate.toDate()).isSameOrAfter(moment())) {
                    const exhibitionItemsResponse = await dbHandler.conditionBassedReadAll(TableName.exhibitionFiles, "exhibitionId", "==", req.query.exhibitionId);
                    res.send(exhibitionItemsResponse)
                } else {
                    res.send({ success: false, message: `This exhibition is not runing now` })
                }
            } else {
                res.send(exhibitionResponse);
            }
        } else {
            res.send({ success: false, message: `Exhibition id is required` })
        }
    } catch (error) {
        res.send({ success: false, message: `${error}` })
    }
});

router.put("/like-item", async (req, res) => {
    try {
        let user = req.decodedUser;
        let body = req.body;
        if (!body.itemId) {
            res.send({ success: false, message: "itemId is required" });
        } else {
            let payload = {}
            if (body.liked) {
                payload.likedBy = firebase.firestore.FieldValue.arrayUnion(user.id)
            } else {
                payload.likedBy = firebase.firestore.FieldValue.arrayRemove(user.id)
            }
            const likeResponse = await dbHandler.update(TableName.exhibitionFiles, body.itemId, payload);
            res.send(likeResponse);
        }
    } catch (error) {
        res.send({ success: false, message: `${error}` })
    }
});

module.exports = router;