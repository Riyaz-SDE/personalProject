import axios from 'axios'
import React from 'react'

/**
 * 
 * @param {OBJECTID} userId 
 * @param {OBJECTID} followeeId 
 * @returns 
 */
function useFollow(userId,followeeId) {
    console.log(userId,followeeId,'inputs');
    const follow = async () => {
        let token = localStorage.getItem('token')
        if(!token){
            console.log('token not exist');
            return
        }
        /**
         * @check - whether token is valid or not
         * @notValid - throw 403
         * @valid - execute below code 
         */
        let ids = {
            userId : userId,
            followeeId : followeeId
        }
        const res = await axios.post('http://localhost:5000/follow', 
        ids,
        {
            headers : { Authorization: `bearer ${localStorage.getItem('token')}`}
        })
        console.log(res);
    }
    const unfollow = async () => {
        let token = localStorage.getItem('token')
        if(!token){
            console.log('token not exist');
            return
        }
        /**
         * @check - whether token is valid or not
         * @notValid - throw 403
         * @valid - execute below code 
         */
        let ids = {
            userId : userId,
            followeeId : followeeId
        }
        const res = await axios.post('http://localhost:5000/unfollow', 
        ids,
        {
            headers : { Authorization: `bearer ${localStorage.getItem('token')}`}
        })
        console.log(res);
    }
  return [follow,unfollow]
}

export default useFollow