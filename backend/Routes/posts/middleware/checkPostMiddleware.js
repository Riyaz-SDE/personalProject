const User = require("../../../model/model")

const checkPost = async (username,postId) => {
    const isPostExist = await User.findOne(
        {username : username, 'posts._id' : postId},
        {'postId.$' : 1}
    )
    console.log(`check post exist`, isPostExist)
    return isPostExist
}


const checkPostMiddleware = async (req,res,next) => {
    try {
        const {username,postId} = req.params
        if(checkPost(username,postId) === null){
            res.status(404).json({message : 'not found'})
            return 
        }
        next()
    } catch (error) {
        res.status(500)
    }
}

module.exports = {checkPostMiddleware}