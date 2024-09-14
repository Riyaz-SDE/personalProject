import axios from 'axios'
import React from 'react'

function useFollow(userId,followeeId) {
    console.log(userId,followeeId,'inputs');
    const follow = async () => {
        let token = localStorage.getItem('token')
        if(!token){
            console.log('token not exist');
            return
        }
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
  return [follow]
}

export default useFollow