const express = require("express");
const router = express.Router();
const dashboard_controller = require("../controllers/dashboard.controller");

router.get("/index",dashboard_controller.listFollowingIllust);

module.exports = router;
