const User = require("../../../../model/model")
const checkPost = require("../../likes/util/checkPost")

const addComment = async (req,res) => {
    try {
        const userData = req.dataFromMiddleware
        const {username,postId} = req.params
        const postdata = {
            username: username,
            postId: postId
        }
        if(checkPost(postdata.username,postdata.postId) === null) {
            console.log(`post not exist`);
            res.status(404)
            return
        }
        // const comment = {
        //     userId : '66e56fe83f4246bda9619ffc',
        //     comment : 'hi nice post I am W'
        // }
        const comment = {
            userId : userData._id,
            comment : req.body.comment
        }
        // check post exist
        const resForaddComment = await User.updateOne(
            {
                username : postdata.username,
                'posts._id' : postdata.postId
            },{
                $push : {'posts.$.comments' : comment}
            }
        )

        console.log(resForaddComment)
        res.status(200).json({message : 'sucess', response : resForaddComment})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'error', error : error})
    }
}

module.exports = addComment