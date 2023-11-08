const express = require("express");
const voteController = require("./../controllers/vote.controller");
const authMiddleware = require("./../common/middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/:pollId/:optionId", voteController.vote);

module.exports = router;
