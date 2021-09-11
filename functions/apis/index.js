const express = require('express');
const router = express.Router();
const authenticationRoutes = require("./authentication");
const exhibitionRoutes = require("./exhibitions");
const verifyToken = require('../middleware/auth');

router.use("/auth", authenticationRoutes);
router.use("/exhibitions", verifyToken, exhibitionRoutes);

module.exports = router;