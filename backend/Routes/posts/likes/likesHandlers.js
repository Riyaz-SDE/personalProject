const User = require("../../../model/model");

const like = async (req,res) => {
    try {
        // const userData = req.dataFromMiddleware
        console.log(req);
        const userData = {
            username : 'w',
            _id : '66e56fe83f4246bda9619ffc'
        }
        // const postId = req.params
        const post = {
            username : 'riyaz',
            postId : '66f69a6da81c55b27f56176f'
        }
        // check user validity
        // check the post validity
        const likeObject = {
            userId : userData._id
        }
        findlike
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

const unLike = async (req,res) => {
    try {
        // const userData = req.dataFromMiddleware
        const userData = {
            username : 'w',
            _id : '66e56fe83f4246bda9619ffc'
        }
        // const postId = req.params
        const post = {
            username : 'riyaz',
            postId : '66f69a6da81c55b27f56176f'
        }
        // check user validity
        // check the post validity
        console.log(`post : `, post, '\n',`user :`, userData);
        const response = await User.updateOne({
            username : post.user,
            'posts._id' : (post.postId)
        },{
            $pull : {'posts.$.likes' : { userId : userData._id}}
        })

        // update the data by userId
        const user = await User.find({username : post.username})
        console.log(response);
        res.status(200).json({message : 'sucess', res : response, changes : user})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'error'})
    }
}
module.exports = {like,unLike}