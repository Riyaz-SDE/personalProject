const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    followers : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    followed : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    createdAt : {
        type : Date ,
        default : Date.now
    }
})

// Create a unique index to prevent duplicate follower-followed pairs
followSchema.index({ follower: 1, followed: 1 }, { unique: true });

// Create the Follow model from the schema
const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;