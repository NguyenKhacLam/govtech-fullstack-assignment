const express = require("express");
const optionController = require("./../controllers/option.controller");
const authMiddleware = require("./../common/middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

// router.route("/:pollId").get(optionController.getAllOptionWithVotedCount);

module.exports = router;
