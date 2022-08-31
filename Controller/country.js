const Country = require("../Model/country");
const asyncHandler = require("express-async-handler");

const getCountries = asyncHandler(async (req, res) => {
    const allCountries = await Country.find();
    res.status(200).json(allCountries);
});

const getCountryByCode = asyncHandler(async (req, res) => {
    const country = await Country.find({ code: req.params.code });
    console.log(country);
    if (!country) {
        res.status(404).send("Country Not Found");
    } else {
        res.status(200).json(country);
    }
});

module.exports = { getCountries, getCountryByCode };