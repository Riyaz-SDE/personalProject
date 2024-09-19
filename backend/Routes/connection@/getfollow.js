const { isValidObjectId, default: mongoose } = require('mongoose');
const User = require('../../model/model');

const router = require('express').Router()

router.get('/', async (req,res) => {
    try {
        const {userId,params} = req.query
        /**
         * @param userId - belong to user want to see their relations
         * @param params - define whthere its follower(true) or followings(false)
         * 
         * below one check user id exist or not
         */
        if(!isValidObjectId(userId)){
            console.log('users id is not valid');
            res.status(404).json({message:'id not valid'})
            return
        }

        /**
         * this will check user is exist or not 
         */
        const isUserNameExist = await User.findOne({_id:userId})
        
        if(!isUserNameExist){
            console.log('userName not exist');
            res.status(404).json({status:'user not exist'})
            return
        }        

        // const isUserExist = await User.find({
        //     _id: {$in : [userId]}
        // },)
        console.log(`user is exist`);
        
        /**
         * 
         * this will find relations of users
         */
        const relations = await User.findOne(
            {_id : userId },
            // {followers:1,followings:1}
            {[params === 'true' ? 'followings':'followers'] : 1}
        )

        /**
         * this will response no content where the array length is zero
         */
        console.log(relations);
        if(params === 'true' && relations.followings.length === 0){
            console.log('no followers');
            res.status(202).json({message : 'no followers'})
            return
        }else if(params === 'false' && relations.followers.length === 0){
            console.log('no followings');
            res.status(204).json({message : 'no followings'})
            return
        }

        let data = []
        console.log(params?'followings':'followers','followings=',params,'======================')

        /**
         * this will send data to client
         */
    if(params === 'true'){
        let followingsList = relations.followings.map(e => e.userId)
        console.log('followings')
        data = await User.find(
            {_id :{ $in : followingsList }},
            {username : 1}
        )
    }else if(params === 'false'){
        let followersList =  relations.followers.map(e => e.userId)
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