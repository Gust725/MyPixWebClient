const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user.controller");
const { route } = require("./login.routes");

router.get("/:id_user", user_controller.User);

module.exports = router;
