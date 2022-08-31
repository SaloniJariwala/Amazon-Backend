const User = require("../Model/user");
const bcrypt = require('bcryptjs');
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "User Authentication";


const getUser = asyncHandler(async (req, res) => {
    let selectedUser;
    if (!req.body.emailOrPhone.includes('@')) {
        selectedUser = await User.findOne({ phoneNo: req.body.emailOrPhone });
    } else {
        selectedUser = await User.findOne({ email: req.body.emailOrPhone });
    }
    if (!selectedUser) {
        return res.status(404).send("User Not Found");
    }
    const passwordMatched = bcrypt.compare(req.body.password, selectedUser.password);
    if (!passwordMatched) {
        return res.status(400).send("Your password is incorrect");
    }
    const token = jwt.sign({
        id: selectedUser._id,
        email: selectedUser.email,
        phoneNo: selectedUser.phoneNo
    }, SECRET_KEY);
    res.status(200).json({ user: selectedUser, token });
});


const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
});

const setUser = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400);
        res.send("Provide your details");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
        fullname: req.body.fullname,
        countryId: req.body.country,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        userType: req.body.userType,
        password: hashedPassword
    })
    res.status(200).json({ user: newUser });
});

const putUsers = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(400);
        throw new Error("User Not Found")
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedUser);
})

const deleteUsers = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(400);
        throw new Error("User Not Found")
    }

    await user.remove();

    res.status(200).json(user);
})

module.exports = { getUser, setUser, putUsers, deleteUsers, getUserById }