const { isValidObjectId } = require('mongoose');
const User = require('../../model/model');

const router = require('express').Router()

router.get('/', async (req,res) => {
    try {
        const {userId} = req.body

        if(!isValidObjectId(userId)){
            console.log('users id is not valid');
            res.status(404).json({message:'id not valid'})
            return
        }
        
        const isUserExist = await User.find({
            _id: {$in : [userId]}
        },)

        console.log(isUserExist,`user is exist`);

        const relations = await User.findOne(
            {_id : userId },
            {followers:1,followings:1}
        )
        console.log(relations);
        let params = false
        let data = []
        
    if(params){
        data = await User.find(
            {_id :{ $in : [relations.followings.map(e => e.userId)]}},
            {username : 1}
        )
    }else if(!params){
        data = await User.find(
            {_id :{ $in : [relations.followers.map(e => e.userId)]}},
            {username : 1}
        )
    }
        res.status(200).json({message:'success',data:{
            relations : relations,
            [params?'followings':'followers']: data
        }})
    } catch (error) {
        console.log('Internal Server Error : ',error)
        res.status(500).json({ message: 'Server error', error })
    }
})

module.exports = router