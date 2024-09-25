import axios from 'axios'
import React, { useRef, useState } from 'react'

function useAddPost(token,urls) {
    const [response,setResponse] = useState()
    const [error,setError] = useState()
    const formRef = useRef()
    async function submit(e){
      e.preventDefault()

      let postBinFile = new FormData()
      let fields = formRef.current

      for(let field of fields){

        if(field.type === 'file'){
          postBinFile.append("post",field.files[0])
        }else if(field.type === 'textarea'){
          postBinFile.append("post",field.value)
        }

      }
      console.log(postBinFile);
      try {
        let response = await axios.post(urls,postBinFile,{
          headers : {
            Authorization : `bearer ${token}`
          }
        })
        console.log(`response is ${response}`);
      } catch (error) {
        console.log(`error is ${error}`);
      }finally{
        console.log(`post upload process exit`);
      }

    }
  return [response,error,formRef,submit]
}

export default useAddPost