import axios from 'axios'
import React, { useEffect, useState } from 'react'

function useFetch(url) {
    const [data,setData]  = useState(undefined)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const fetct = async() => {
        try {
            setLoading(true)
            let response = await axios.get(url)
            setData(response)
        } catch (error) {
            console.log(error)
            setError(error)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        fetct()
    },[])

    return [data,loading,error]
}

export default useFetch