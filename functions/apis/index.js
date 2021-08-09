const express = require('express');
const router = express.Router();
const authenticationRoutes = require("./authentication")

router.use("/auth", authenticationRoutes)

module.exports = router;