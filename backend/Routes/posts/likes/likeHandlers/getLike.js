const User = require("../../../../model/model")

const getLike = async(req,res) => {
    try {
        const userData = req.dataFromMiddleware
        const postId = req.params.postId
        const username = req.params.username
        console.log(userData)
        const getLikedUsers = await User.findOne({
            username : username,
            'posts._id' : postId 
        },
        {'posts.$' : 1}
    )
        const likes = getLikedUsers.posts[0].likes
        console.log('liked users',getLikedUsers)
        res.status(200).json({message : 'sucess', response : likes})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'Internal server errro', error : error })
    }
}
module.exports = getLike