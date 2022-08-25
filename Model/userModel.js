const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please Add Your Name']
    },
    username: {
        type: String,
        required: [true, 'Please Add Your Username']
    },
    phoneNo: {
        type: Number,
        required: [true, 'Plaese Add Your Mobile Number']
    },
    email: {
        type: String,
        required: [true, 'Please Add Your Email']
    },
    password: {
        type: String
    }
},
    {
        timestamp: true,
    }
)

module.exports = mongoose.model("users", userSchema);