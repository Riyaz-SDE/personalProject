import axios from 'axios'
import React, { useEffect, useState } from 'react'

// function useFetch(url) {

//     const [data,setData]  = useState(undefined)
//     const [loading,setLoading] = useState(false)
//     const [error,setError] = useState(false)

//     useEffect(() => {
//         const fetct = async() => {
//             setLoading(true)
//             try {
//                 let response = await axios.get(url)
//                 setLoading(false)
//                 setData(response)
//             } catch (error) {
//                 console.log(error)
//                 setLoading(false)
//                 setError(error)
//             }
//         }
//         fetct()
//     },[])

//     return [data,loading,error]
// }
const cache = new Map();

function useFetch(url) {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Check if the data is already in the cache
    //   if (cache.has(url)) {
    //     console.log('Fetching from cache:', cache.get(url));
    //     setData(cache.get(url)); // Return cached data
    //     setLoading(false);
    //     return;
    //   }

      try {
        await new Promise( (resolve) => setTimeout(resolve,1000) )
        let response = await axios.get(url);
        console.log(response,response);
        // Store the fetched data in cache
        cache.set(url, response.data);
        setData(response);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // Add url to dependency array to refetch if it changes

  return [data, loading, error];
}
export default useFetch