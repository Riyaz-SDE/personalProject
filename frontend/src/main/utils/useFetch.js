import axios from 'axios'
import React, { useEffect, useState } from 'react'

function useFetch({url,data}) {
    const [data,setData]  = useState()
    const [loading,setLoading] = useState(false)
    const fetct = async(url) => {
        try {
            setLoading(true)
            let response = await axios.get(url)
            setData(response)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        fetct()
    },[])

    return [fetch,data,loading]
}

export default useFetch