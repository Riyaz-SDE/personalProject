import axios from 'axios'
import { useEffect, useState } from 'react'

function useFetch(url) {
    const [data,setData] = useState(false)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
  const fetchData = async () => {
    // setLoading(true)
    try {
        const response = await axios.get(url)
        setData(response)
        console.log(`this run on useFetch custom hook data fetched successfully and data is ${data}`);
    } catch (error) {
        console.log(`this run on useFetch custom hook data fetched unsuccessfully and data is ${error}`);
        setError(error)
    }finally{
        console.log(`this run on useFetch custom hook data fetching process finished`);
        // setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  },[])
  return[data,loading,error]
}

export default useFetch