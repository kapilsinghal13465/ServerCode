var express = require("express");

const UserController = require("../contollers/user");
const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

module.exports = router;
