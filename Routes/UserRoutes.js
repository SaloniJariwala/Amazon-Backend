const express = require("express");
const router = express.Router();
const { getUsers, setUsers, putUsers, deleteUsers, getUserById } = require("../Controller/user");

router.route("/").get(getUsers).post(setUsers);
router.route("/:id").put(putUsers).delete(deleteUsers).get(getUserById);

module.exports = router;