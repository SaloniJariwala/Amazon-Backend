const express = require("express");
const router = express.Router();
const { getCountries, getCountryByCode } = require("../Controller/country");

router.route("/").get(getCountries);
router.route("/:code").get(getCountryByCode);

module.exports = router;