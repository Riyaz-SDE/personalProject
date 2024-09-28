const { default: mongoose } = require('mongoose')

const checkObjectId = async (req,res,next) => {
    console.log('loopop');
    if(mongoose.isObjectIdOrHexString(req.params.postId)){
        next()
    }else{
        res.status(400).json({message : 'invalid parameter'})
    }
}

module.exports = checkObjectId