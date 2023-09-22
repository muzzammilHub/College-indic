//importing express
const express = require("express");
const router = express.Router();

// contoller acquiring
const { login, register } = require("../controllers/user_controller")

router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;