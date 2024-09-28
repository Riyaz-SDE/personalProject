const User = require("../../../../model/model")

const checkPost = async (username,postId) => {
    const isPostExist = await User.findOne(
        {username : username, 'posts._id' : postId},
        {'postId.$' : 1}
    )
    console.log(`check post exist`, isPostExist)
    return isPostExist
}

module.exports = checkPost