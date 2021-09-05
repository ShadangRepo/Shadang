const express = require('express');
const router = express.Router();
const authenticationRoutes = require("./authentication");
const exhibitionRoutes = require("./exhibitions");

router.use("/auth", authenticationRoutes);
router.use("/exhibitions", exhibitionRoutes);

module.exports = router;