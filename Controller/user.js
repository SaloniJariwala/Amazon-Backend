const User = require("../Model/user");
const bcrypt = require('bcryptjs');
const asyncHandler = require("express-async-handler");
const { response } = require("express");

const getUsers = asyncHandler(async (req, res) => {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
});

const setUsers = asyncHandler((req, res) => {
    if (!req.body) {
        res.status(400);
        res.send("Provide your details");
    }
    let newUser;
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
            return res.status(500).json({ error });
        } else {
            newUser = User.create({
                fullname: req.body.fullname,
                countryId: req.body.country,
                email: req.body.email,
                phoneNo: req.body.phoneNo,
                userType: req.body.userType,
                password: hash
            })
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((error) => {
                    res.status(500).json({ error });
                });
        }
    })
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

module.exports = { getUsers, setUsers, putUsers, deleteUsers, getUserById }