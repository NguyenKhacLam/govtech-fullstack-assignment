const express = require("express");
const pollController = require("./../controllers/poll.controller");
const authMiddleware = require("./../common/middleware/auth.middleware");
const validation = require("./../common/middleware/validate.middleware");
const createPollSchema = require("../dto/create-poll.dto");

const router = express.Router();

router.use(authMiddleware);

router
  .route("")
  .get(pollController.getAllPolls)
  .post(validation(createPollSchema), pollController.createPoll);

router
  .route("/:pollId")
  .get(pollController.getPoll)
  .delete(pollController.deletePoll);

module.exports = router;
