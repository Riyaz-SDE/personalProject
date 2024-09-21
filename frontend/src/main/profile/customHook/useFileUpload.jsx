import axios from 'axios'
import React, { useRef, useState } from 'react'

function useFileUpload(token, url,url2) {
  const [status,setStatus] = useState(false)
  const [error, setError] = useState(false)
  const inputFileRef = useRef()

  const uploadFile = async () => {
      try {

        setStatus(true)
        const file = inputFileRef.current.files[0]
        console.log(`file upload ${file}`)
        if(!file){
            throw "Error file not Found"
        }

        const binFile = new FormData()
        binFile.append('ProfilePic',file)

        const response = await axios.post(url, binFile, {
            headers: {
                Authorization: `bearer ${token}`
            }
        })
        console.log(`file uploaded with response: ${response}`);

        const updateFileResponse = await axios.get(`${url2}`, {
            headers: { Authorization: `bearer ${token}` }
        });

        setStatus(updateFileResponse)
        console.log('User data fetched:', response.data);
    } catch (err) {
        console.log(`error occured`)
        setError(err)
    } finally{
        setStatus(false)
    }
}
return [status,error,uploadFile,inputFileRef]
}

export default useFileUpload