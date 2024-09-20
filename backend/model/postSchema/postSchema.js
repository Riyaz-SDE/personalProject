const {Schema } = require("mongoose");
const comment = require("./commentSchema");
const like = require("./likeSchema");


const post = new Schema({
    date: {
        type: Date,
        default: new Date()
    },
    file:{
        type: String,
        require: true
    },
    content:{
        type: String,
        require: true
    },
    likes:{
        type: [like],
        default: []
    },
    comments:{
        type: [comment],
        default:[]
    }
})

module.exports = post