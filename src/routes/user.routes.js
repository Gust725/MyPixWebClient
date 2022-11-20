const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user.controller");

router.get("/:id_user", user_controller.User);

module.exports = router;
