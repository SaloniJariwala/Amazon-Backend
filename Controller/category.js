const Category = require("../Model/category");
const asyncHandler = require("express-async-handler");

const getCategories = asyncHandler(async (req, res) => {
    const allCategories = await Category.find();
    res.status(200).json(allCategories);
});

const setCategory = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400).send("Category Data is missing");
    }
    const category = await Category.create({
        name: req.body.name,
        subCategory: req.body.subCategory
    });
    res.status(200).json({category});
});

module.exports = {getCategories, setCategory};