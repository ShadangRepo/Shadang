const express = require('express');
const dbHandler = require('../firebase-utils/dbHandler');
const constants = require('../utils/constants');
const TableName = constants.TableName;
const router = express.Router();
const firebase = require("../firebase-utils/firebaseConfig");
const moment = require("moment");
const { Timestamp, arrayUnion, arrayRemove } = require('firebase/firestore');

//exhibitions
router.post("/create", async (req, res) => {
    let body = req.body;
    let user = req.decodedUser;
    try {
        if (!body.title) {
            res.send({ success: false, message: "Title is required" });
        } else if (!body.category) {
            res.send({ success: false, message: "Category is required" });
        } else if (!body.startDate) {
            res.send({ success: false, message: "Start date is required" });
        } else if (!body.endDate) {
            res.send({ success: false, message: "End date is required" });
        } else {
            let exhibitionDetails = { ...body, createdBy: user.id };
            exhibitionDetails.startDate = Timestamp.fromDate(new Date(exhibitionDetails.startDate))
            exhibitionDetails.endDate = Timestamp.fromDate(new Date(exhibitionDetails.endDate))
            delete exhibitionDetails.images
            const response = await dbHandler.create(TableName.exhibitions, exhibitionDetails)
            if (response.success) {
                var formattedImages = body.images ? body.images.map(item => ({
                    ...item,
                    exhibitionId: response.data.id,
                    likedBy: []
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
        res.send({ success: false, message: error.message })
    }
});

router.get("/myExhibitions", async (req, res) => {
    let user = req.decodedUser;
    try {
        const response = await dbHandler.conditionBasedReadAll(TableName.exhibitions, "createdBy", "==", user.id);
        if (response.success && response.data) {
            response.data = response.data.map(item => ({
                ...item,
                startDate: item.startDate.toDate(),
                endDate: item.endDate.toDate(),
                createdAt: item.createdAt.toDate(),
                updatedAt: item.updatedAt ? item.updatedAt.toDate() : null
            }));
            res.send(response)
        } else {
            res.send(response)
        }

    } catch (error) {
        res.send({ success: false, message: error.message })
    }
});

router.get("/list", async (req, res) => {
    try {
        let currentDate = Timestamp.fromDate(new Date());
        const exhibitionResponse = await dbHandler.conditionBasedReadAll(TableName.exhibitions, "endDate", ">=", currentDate);
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
        res.send({ success: false, message: error.message })
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
                    const exhibitionItemsResponse = await dbHandler.conditionBasedReadAll(TableName.exhibitionFiles, "exhibitionId", "==", req.query.exhibitionId);
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
        res.send({ success: false, message: error.message })
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
                payload.likedBy = arrayUnion(user.id)
            } else {
                payload.likedBy = arrayRemove(user.id)
            }
            const likeResponse = await dbHandler.update(TableName.exhibitionFiles, body.itemId, payload);
            res.send(likeResponse);
        }
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
});

router.get("/details", async (req, res) => {
    try {
        if (req.query.exhibitionId) {
            const exhibitionResponse = await dbHandler.readDocBasedOnId(TableName.exhibitions, req.query.exhibitionId);
            if (!exhibitionResponse.success && exhibitionResponse.message === constants.DocumentNotExistMessage) {
                res.send({ success: false, message: "Invalid exhibition id" });
            } else if (exhibitionResponse.success && exhibitionResponse.data) {
                let exhibitionData = {
                    ...exhibitionResponse.data,
                    startDate: exhibitionResponse.data.startDate.toDate(),
                    endDate: exhibitionResponse.data.endDate.toDate(),
                    createdAt: exhibitionResponse.data.createdAt.toDate()
                };
                const exhibitionItemsResponse = await dbHandler.conditionBasedReadAll(TableName.exhibitionFiles, "exhibitionId", "==", req.query.exhibitionId);
                exhibitionData.images = exhibitionItemsResponse.success && exhibitionItemsResponse.data ? exhibitionItemsResponse.data
                    .map(item => ({
                        ...item,
                        createdAt: item.createdAt ? item.createdAt.toDate() : null,
                        updatedAt: item.updatedAt ? item.updatedAt.toDate() : null
                    })) : [];
                res.send({ success: true, data: exhibitionData });
            } else {
                res.send(exhibitionResponse);
            }
        } else {
            res.send({ success: false, message: `Exhibition id is required` })
        }
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
});

router.put("/update", async (req, res) => {
    let body = req.body;
    let user = req.decodedUser;
    try {
        if (!body.title) {
            res.send({ success: false, message: "Title is required" });
        } else if (!body.category) {
            res.send({ success: false, message: "Category is required" });
        } else if (!body.startDate) {
            res.send({ success: false, message: "Start date is required" });
        } else if (!body.endDate) {
            res.send({ success: false, message: "End date is required" });
        } else {
            let exhibitionDetails = { ...body, createdBy: user.id };
            exhibitionDetails.startDate = Timestamp.fromDate(new Date(exhibitionDetails.startDate))
            exhibitionDetails.endDate = Timestamp.fromDate(new Date(exhibitionDetails.endDate))
            delete exhibitionDetails.images;
            const response = await dbHandler.update(TableName.exhibitions, body.id, exhibitionDetails);
            if (response.success) {
                var formattedImages = body.images ? body.images.map(item => ({
                    ...item,
                    exhibitionId: response.data.id,
                    likedBy: []
                })) : [];
                let existingImages = formattedImages.filter(item => item.id).map(item => {
                    let image = { ...item };
                    delete image.likedBy;
                    delete image.url;
                    return image;
                });
                let newImages = formattedImages.filter(item => !item.id);
                if (existingImages && existingImages.length > 0) {
                    await dbHandler.batchSet(TableName.exhibitionFiles, existingImages);//update existing images
                }
                if (newImages && newImages.length > 0) {
                    await dbHandler.batchCreate(TableName.exhibitionFiles, newImages)//create new records
                }
                res.send({ success: true, message: "Exhibition created successfully" });
            } else {
                res.send(response);
            }
        }
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
});

module.exports = router;