//import express
const router = require("express").Router();

//import controller functions
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
} = require("../../controllers/userController");

//routing to api/users (all users)
router.route("/").get(getUsers).post(createUser);

//routing to api/users/:userId (one users)
router
  .route('/:userId')
  .get(getUser)
  .put(updateUser);

module.exports = router;
