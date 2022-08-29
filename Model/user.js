const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
            required: [true, 'Please Add Your Name']
        },
        countryId: {
            type: String,
        },
        phoneNo: {
            type: Number,
            unique: true,
            match: /[0-9]/,
            required: [true, 'Plaese Add Your Mobile Number']
        },
        userType: {
            type: String,
            required: [true, 'Please Provide User Type']
        },
        email: {
            type: String,
            trim: true,
            unique: true
        },
        password: {
            type: String
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("users", userSchema);