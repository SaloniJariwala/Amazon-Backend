const express = require("express");
const router = express.Router();
const { getUser, setUser, putUsers, deleteUsers, getUserById } = require("../Controller/user");

router.route("/sign-up").post(setUser);
router.route("/sign-in").post(getUser);
router.route("/:id").put(putUsers).delete(deleteUsers).get(getUserById);

module.exports = router;