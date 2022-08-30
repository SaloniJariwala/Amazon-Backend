const User = require("../Model/user");
const bcrypt = require('bcryptjs');
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const getUser = asyncHandler(async (req, res) => {
    // const allUsers = await User.find();
    // res.status(200).json(allUsers);
    let emailUser, phoneNoUser;
    if (req.body.email) {
        emailUser = User.find({ email: req.body.email });
        // console.log(emailUser);
    } else {
        phoneNoUser = User.find({ phoneNo: req.body.phoneNo });
    }
    console.log(emailUser, ",", phoneNoUser);
    if (!emailUser || !phoneNoUser) {
        res.status(400).send("User Not Found");
    }
    const user = emailUser ? emailUser : phoneNoUser;
    console.log(user);
    bcrypt.compare(req.body.password, user[0].password, (error, success) => {
        if (!success) {
            return res.status(401).send("Your Password is incorrect");
        }
        if (success) {
            const token = jwt.sign(
                {
                    email: user[0].email,
                    phoneNo: user[0].phoneNo,
                    userType: user[0].userType
                },
                "Login Token",
                {
                    expiresIn: "24h"
                }
            );
            res.status(200).send(token);
        }
    })
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
});

const setUser = asyncHandler((req, res) => {
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
                    res.status(500).json(error);
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

module.exports = { getUser, setUser, putUsers, deleteUsers, getUserById }