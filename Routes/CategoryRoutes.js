const express = require("express");
const router = express.Router();
const { getCategories } = require("../Controller/category");

router.route("/").get(getCategories);

module.exports = router;