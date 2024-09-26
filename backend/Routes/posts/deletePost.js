const { authMiddleware } = require('../../middleware/upload')
const User = require('../../model/model')

const route = require('express').Router()

route.delete('/', async (req,res) => {
    const userData = req.dataFromMiddleware
    const postId = req.body.postId
    console.log(
        userData,postId
    );
    // file deleting logic
    const deletedPost = await User.updateMany(
        { username : userData.username, },
        { $pull : {
            posts : { _id : postId}
        }}
    )
    console.log(postId,deletedPost);
    res.status(200).json({message: 'post deleted', data: req.customData, dbRes : deletedPost})
})
module.exports = route