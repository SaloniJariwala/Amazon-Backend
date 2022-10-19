const express = require("express");
const router = express.Router();
const { getCategories, setCategory } = require("../Controller/category");

router.route("/").get(getCategories).post(setCategory  );

module.exports = router;