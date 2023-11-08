const express = require("express");
const authController = require("./../controllers/auth.controller");
const validation = require("./../common/middleware/validate.middleware");
const signUpSchema = require("../dto/sign-up.dto");
const signInSchema = require("../dto/sign-in.dto");

const router = express.Router();

router.post("/signup", validation(signUpSchema), authController.signup);
router.post("/login", validation(signInSchema), authController.login);
router.get("/logout", authController.logout);

module.exports = router;
