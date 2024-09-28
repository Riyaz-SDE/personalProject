const User = require("../../../../model/model");
const checkPost = require("../util/checkPost");

const like = async (req,res) => {
    try {
        const userData = req.dataFromMiddleware
        console.log(req);
        // const userData = {
        //     username : 'w',
        //     _id : '66e56fe83f4246bda9619ffc'
        // }
        // const postId = req.params
        const post = {
            username : req.params.username,
            postId : req.params.postId
        }
        if(checkPost(post.username,post.postId) === null) {
            console.log(`post not exist`);
            return
        }
        // check user validity
        // check the post validity
        const likeObject = {
            userId : userData._id
        }
        const response = await User.updateOne(
            {
                username : post.username,
                'posts._id': post.postId
            },
            {
                $push:{'posts.$.likes' : likeObject}
            }
        )
        const user = await User.find({username : post.username})
        console.log(user);
        console.log(response);
        res.status(200).json({message : 'success', changed : user})
        // post the data {userId,}
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'error'})
    }
}
module.exports = like