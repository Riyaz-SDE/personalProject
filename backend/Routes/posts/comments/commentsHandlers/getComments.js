const User = require("../../../../model/model")

const getComment = async (req,res) => {
    try {
        console.log(req.params)
        // const username = req.body.username
        const username = req.params.username
        // const postId = req.body.postId
        const postId = req.params.postId
        const postData = await User.findOne(
            {
                username : username,
                'posts._id' : postId 
            },
            {'posts.$': 1}
        )
        if(postData === null){
            res.status(404).json({message : 'no post'})
            return
        }

        const comments = postData.posts[0].comments

        console.log(`comments ${comments}`, comments);
        if(comments.length) {
            console.log(comments)
            res.status(200).json({message : 'success',data:comments})
            return
        }

        return res.status(204).json({message : 'no comments'})

    } catch (error) {
        console.log(error);
        res.status(500).json({messgae : 'internal server error',error : error})
    }
}

module.exports = getComment