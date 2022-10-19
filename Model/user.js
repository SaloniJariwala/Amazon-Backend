const mongoose = require("mongoose");

const businessSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        gstNo : {
            type: String,
            required: [true, 'GST number is missing'],
            maxLength: [15, 'Wrong GST number']
        },
        address: {
            type: String,
        },
        phoneNo: {
            type: String,
            maxLength: [10, 'wrong mobile number']
        },
        email: {
            type: String
        },
        productCategory: [{
            type: String
        }]
    }
);

const bankSchema = mongoose.Schema(
    {
        aadharNo: {
            type: String,
            required: [true, 'Aadhar number is missing']
        },
        panNo: {
            type: String,
            required: [true, 'PAN number is missing']
        },
        bankName: {
            type: String,
            required: [true, 'Bank name is missing']
        },
        ifscCode: {
            type: String,
            required: [true, 'IFSC code is missing']
        }
    }
);

const sellingSchema = mongoose.Schema(
    {
        BusinessDetails: {
            type: businessSchema
        },
        BankDetails: {
            type: bankSchema
        }
    }
);


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
            type: String,
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
        },
        password: {
            type: String
        },
        sellingDetails: {
            type: sellingSchema
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("users", userSchema);