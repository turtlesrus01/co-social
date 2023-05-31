//import express
const router = require("express").Router();

//import controller functions
const {
  getThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

//routing to api/thoughts (all users)
router.route("/").get(getThoughts).post(createThought);                       

//routing to api/thoughts/:thoughtId (one users)
router
  .route("/:thoughtId")
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

//routing to api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction);

//routing to api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
