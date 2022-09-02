const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema(
    {
        email: {
            type: String,
            require: [true, 'Email address is missing']
        },
        shopName: {
            type: String,
            require: [true, 'Shop name is missing']
        },
        productCategoryId: {
            type: String,
            require: [true, 'productCategoryId is missing']
        },
        aadharNo: {
            type: Number,
            require: [true, 'Aadhar number is missing'],
            maxLength: 12
        },
        panNo: {
            type: String,
            require: [true, 'PAN number is missing'],
            maxLength: 12
        },
        gstNo: {
            type: String,
            require: [true, 'GST number is missing'],
            maxLength: 15
        }
    },
    {
        timestamps: true,
    }
);