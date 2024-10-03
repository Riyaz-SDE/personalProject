import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../Api/api'

function useAuth(token,url) {
    token = localStorage.getItem('token')
    const [data, setData] = useState()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    useEffect(()=>{
        console.log(`local storage ${localStorage.getItem("token")}`);
        if(!token){
            // console.log(`token was not found at local storage`);
            localStorage.clear();
            navigate('/')
        }

        let fetch = async () => {
            console.log(`data fetching`);
            try {
                setLoading(true)
                console.log(token,localStorage.getItem("token"))
                url = api.userInfo
                let response = await axios.get(url,{
                    headers : {
                        Authorization : `bearer ${token}`
                    }
                }); 
                setData(response.data)
                localStorage.setItem("userId",response.data?._id)
                // console.log(`12334`,response.data);
                // console.log(`useAuth custom hook ${response}`);
                // console.log(`data fetched`);
            } catch (error) {
                // console.log(`error on fetching`);
                // console.log(`useAuth custom hook ${error}`);
                console.log(error);
                setError(error)
            } finally{
                setLoading(false)
            }
        }
    fetch()
    },[])
    console.log(`use auth hook exited`);
    return[data, error, loading,setData]
}
export default useAuth

/**
 * 
 * redirect --- fetch
 */