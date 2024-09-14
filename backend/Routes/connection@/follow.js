const { isValidObjectId } = require('mongoose');
const User = require('../../model/model');

const router = require('express').Router()

router.post('/', async (req,res) => {
    try {
        const {userId,followeeId} = req.body
        console.log(userId,followeeId);
        if(!isValidObjectId(userId)||!isValidObjectId(followeeId)||(userId===followeeId)){
            console.log('users id is not valid');
            res.status(404).json({message:'id not valid'})
            return
        }
        const isUserExist = await User.find({
            _id: {$in : [userId,followeeId]}
        },)

        if(isUserExist.length !== 2){
            console.log('only one Id is valid');
            res.status(404).json({message:'only one Id is valid'})
            return
        }
        
        console.log(isUserExist,`user is exist`);
        const following = await User.findOneAndUpdate(
            {_id : userId },
            {
                $push : {followings : {
                    userId : followeeId
                }}
            }
        )
        const followers = await User.findOneAndUpdate(
            {_id : followeeId},
            {
                $push : {followers : {
                    userId : userId
                }}
            }
        )
        console.log(following,followers);
        res.status(200).json({message:'success',data:isUserExist})
    } catch (error) {
        console.log('Internal Server Error : ',error)
        res.status(500).json({ message: 'Server error', error })
    }
})

module.exports = router