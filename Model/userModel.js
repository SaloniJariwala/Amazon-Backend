const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please Add Your Name']
    },
    countryId: {
        type: Number,
    },
    phoneNo: {
        type: Number,
        required: [true, 'Plaese Add Your Mobile Number']
    },
    userType: {
        type: String,
        required: [true, 'Please Provide User Type']
    },
    email: {
        type: String,
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