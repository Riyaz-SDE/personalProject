const { Schema, Types } = require("mongoose");

const like = new Schema({
    time: {
        type: Date,
        default: new Date()
    },
    userId: {
        type: Types.ObjectId,
        require: true,
    }
})

module.exports = like