const mongoose = require("mongoose");

const countrySchema = mongoose.Schema({
    code: {
        type: String,
    },
    name: {
        type: String,
    },
    phoneCode: {
        type: String,
    },
},
    {
        timestamp: true,
    }
);

module.exports = mongoose.model("countries", countrySchema);