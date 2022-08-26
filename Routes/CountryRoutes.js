const express = require("express");
const router = express.Router();
const { getCountries, getCountryByCode } = require("../Controller/countryController");

router.route("/").get(getCountries);
router.route("/:code").get(getCountryByCode);

module.exports = router;