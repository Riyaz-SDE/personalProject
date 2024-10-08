const User = require("../../model/model");

const deletePost = async (req,res) => {
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
}

const addPost = async (req,res) => {
    try {
        const userData = req.dataFromMiddleware
        // console.log(`user data`,userData);
        console.log(`file object`,req.file,req.body.content);
        const postFilename = req.file.filename
        const postContent = req.body.content
        console.log('creadentials',postContent,postFilename);
        if(!postFilename || !postContent) {
            res.status(400).json({message : 'data missing'})
            return
        }
        // const isUserExist = await User.findOne({username : req.username})
        const addPostDB = await User.updateOne(
            { username : userData.username },
            {
                $push : { posts : {
                file : postFilename,
                content : postContent,
                likes : [],
                comments : [],}}
            }
        )
        console.log(addPostDB);
        res.status(200).json({message: 'sucesss', data: req.customData, Dbres: addPostDB})
    } catch (error) {
        console.log(error);
    }
}

const getPost = async (req,res) => {
    try {
        const {username} = req.params
        console.log(username);
        const posts = await User.findOne({username : username,},{posts : 1})
        console.log(posts);
        res.status(200).json({message : 'success', data : posts})
    } catch (error) {
        console.log(error);
        res.status(500).json({messgae : 'error'})
    }
}
module.exports = {deletePost,addPost,getPost}