const mongoose = require('mongoose')

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
const userSchema = new mongoose.Schema({
    name:{
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
    profile: profilePath
    
})

const User = mongoose.model('User',userSchema)
module.exports = User