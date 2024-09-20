const mongoose = require('mongoose')
const post = require('./postSchema/postSchema')

const profilePath= new mongoose.Schema({
    fileName: {
        type : String,
        default : 'DEFAULT.webp'
    },
    path:{
        type : String,
        default : ''
    },
})
const follow = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        require:true,
    },
    createdAt: {
        type: Date,
        dafault : new Date()
    },
})
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require:true
    },
    password:{
        type: String,
        require:true
    },
    path:{
        type: String,
        require:true
    },
    profile: profilePath,
    followers : {
        type:[follow],
        default:[]
    },
    followings :{
        type:[follow],
        default:[]
    },
    posts : {
        type: [post],
        default: []
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User