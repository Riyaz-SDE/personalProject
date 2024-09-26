// const { authMiddleware } = require('../../middleware/upload')
const User = require('../../model/model')

const route = require('express').Router()
/**
 * user data {
  _id: new ObjectId('66e96b0d2605f345889a1236'),
  username: 'riyaz',
  password: '$2b$10$58CLgOBNhyQzKuZEd6osHODgRVU9Nu3o233Gocy.UCvj098TqWB0y',
  path: 'C:\\Users\\Admin\\Desktop\\socialMedia\\my social media project\\backend\\uploads\\riyaz',
  profile: {
    fileName: '1726573344355-5c72ff3e-859a-457a-ae11-e1392baa90af.gif',
    path: 'C:\\Users\\Admin\\Desktop\\socialMedia\\my social media project\\backend\\uploads\\riyaz\\1726573344355-5c72ff3e-859a-457a-ae11-e1392baa90af.gif',
    _id: new ObjectId('66e96b0d2605f345889a1237')
  },
  followers: [
    {
      userId: new ObjectId('66e568b8b1042237c715fdf2'),
      _id: new ObjectId('66eabbe1e4bf45b1f1231f02')
    }
  ],
  followings: [
    {
      userId: new ObjectId('66e568b8b1042237c715fdf2'),
      _id: new ObjectId('66eabc1fe4bf45b1f1231f67')
    }
  ],
  __v: 0,
  posts: []
}
 */
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