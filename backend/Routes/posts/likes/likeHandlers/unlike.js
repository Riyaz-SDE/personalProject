const User = require("../../../../model/model");
const checkPost = require("../util/checkPost");
const checkUser = require("../util/checkUser");

const unLike = async (req,res) => {
    try {
        const userData = req.dataFromMiddleware
        // const userData = {
        //     username : 'w',
        //     _id : '66e56fe83f4246bda9619ffc'
        // }
        // const postId = req.params
        const post = {
            username : req.params.username,
            postId : req.params.postId
        }
        const userObject = { userId : userData._id}
        // check user 
        
        if(checkUser(userData._id) === null) {
            console.log(`user not exist`);
            return
        }
        // check the post validity
        if(checkPost(post.username,post.postId) === null) {
            console.log(`post not exist`);
            return
        }
        // console.log(`post : `, post, '\n',`user :`, userData);
        
        const response = await User.updateOne({
            username : post.username,
            "posts._id" : post.postId
        },{
            $pull : {"posts.$.likes" : userObject }
        })
        // const response = ''
        const response2 = await User.findOne({
            username : post.user,
            "posts._id" : post.postId
        },{
            // "posts.$" :   1
        })

        // update the data by userId
        const user = await User.find({username : post.username})
        console.log(response);
        res.status(200).json({
            message : 'sucess', 
            res : response , 
            res2 : response2, 
            changes : user})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'error', error : error})
    }
}

module.exports = unLike
