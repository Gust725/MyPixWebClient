const express = require("express");
const router = express.Router();
const illust_controller = require("../controllers/illust.controller");

router.get("/index",illust_controller.listFollowingIllust);

module.exports = router;