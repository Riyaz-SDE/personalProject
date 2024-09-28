// const { authMiddleware } = require('../../middleware/upload')
const User = require('../../model/model')

const route = require('express').Router()

route.post('/', require('../../middleware/postUpload').uploads.single("post"),
 async (req,res) => {
    try {
        const userData = req.dataFromMiddleware
        // console.log(`user data`,userData);
        // console.log(`file object`,req.file,req.body.content);
        const postFilename = req.file.filename
        const postContent = req.body.content
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
})
module.exports = route