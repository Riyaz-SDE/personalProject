const mongoose = require('mongoose')
const userRel = new mongoose.Schema({
    type : mongoose.Schema.Types.ObjectId,
})
const followSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        require : true
    },
    followers : [userRel],
    followed : [userRel],
    createdAt : {
        type : Date ,
        default : Date.now
    }
})

// Create a unique index to prevent duplicate follower-followed pairs
// followSchema.index({  user : 1 });
// followSchema.index({  followers: 1 });
// followSchema.index({ followed: 1 });

// Create the Follow model from the schema
const Follow = mongoose.model('Follows', followSchema);

module.exports = Follow;