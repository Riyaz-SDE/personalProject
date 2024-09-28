const User = require("../../../../model/model");
const checkPost = require("../../likes/util/checkPost");

const deleteComment = async (req,res) => {
    try {
        const userData = {
            userId : req.dataFromMiddleware._id
        }
        const postData = {
            postId : req.params.postId,
            username : req.params.username
        }
        if(checkPost(postData.username,postData.postId) === null) {
            console.log(`post not exist`);
            return
        }
        const toDelete = userData
        const deleteCommentResponse = await User.updateOne(
            {
                username : postData.username,
                'posts._id' : postData.postId
            },{
                $pull : {'posts.$.comments' : toDelete}
            }
        )
        console.log(deleteCommentResponse);
        res.status(200).json({message : 'success', response : deleteCommentResponse})
    } catch (error) {
        res.status(500).json({message : 'error', error : error})
    }
}

module.exports = deleteComment