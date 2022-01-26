const express = require('express');
const router = express.Router();
const authenticationRoutes = require("./authentication");
const exhibitionRoutes = require("./exhibitions");
const userRoutes = require("./users");
const verifyToken = require('../middleware/auth');

router.use("/auth", authenticationRoutes);
router.use("/exhibitions", verifyToken, exhibitionRoutes);
router.use("/users", verifyToken, userRoutes);

module.exports = router;