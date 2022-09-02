const { default: mongoose } = require("mongoose");

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('categories',)