const { Schema, Types } = require("mongoose");

const comment = new Schema({
    time: {
        type: Date,
        default: new Date()
    },
    userId:{
        type: Types.ObjectId,
        require: true
    },
    comment: {
        type: String,
        require: true
    }
})

module.exports = comment