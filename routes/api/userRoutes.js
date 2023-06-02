//import express
const router = require("express").Router();

//import controller functions
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend
} = require("../../controllers/userController");

//routing to api/users (all users)
router.route("/").get(getUsers).post(createUser);

//routing to api/users/:userId (one users)
router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

//routing to api/users/:userId/friends/ to create one friend
router.route('/:userId/friends/').post(createFriend)

//routing to api/users/:userId/friends/:friendId to delete one friend
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;
