const { isValidObjectId, default: mongoose } = require('mongoose');
const User = require('../../model/model');

const router = require('express').Router()

router.get('/', async (req,res) => {
    try {
        const {userId,params} = req.query
        console.log(userId)
        if(!isValidObjectId(userId)){
            console.log('users id is not valid');
            res.status(404).json({message:'id not valid'})
            return
        }
        
        const isUserExist = await User.find({
            _id: {$in : [userId]}
        },)

        // console.log(isUserExist,`user is exist`);
        console.log(`user is exist`);

        const relations = await User.findOne(
            {_id : userId },
            {followers:1,followings:1}
        )
        // console.log('relations',relations);
        // let params = true
        let data = []
        console.log(params?'followings':'followers','followings=',params,'======================')
    if(params === 'true'){
        let followingsList = relations.followings.map(e => e.userId)
        // console.log('followings',followingsList)
        console.log('followings')
        data = await User.find(
            {_id :{ $in : followingsList }},
            {username : 1}
        )
    }else if(params === 'false'){
        let followersList =  relations.followers.map(e => e.userId)
        // console.log('followers',followersList)
        console.log('followers')
        data = await User.find(
            {_id :{ $in : followersList}},
            {username : 1}
        )
    }
        res.status(200).json({message:'success',data:{
            relations : relations,
            [params === 'true' ? 'followings':'followers']: data
        }})
    } catch (error) {
        console.log('Internal Server Error : ',error)
        res.status(500).json({ message: 'Server error', error })
    }
})

module.exports = router