const express = require("express");
const router = express.Router();
const dashboard_controller = require("../controllers/dashboard.controller");

router.get("/",dashboard_controller.listFollowingIllust);
router.get("/request", dashboard_controller.request)
router.get("/commission", dashboard_controller.commission)
module.exports = router;
