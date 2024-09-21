import React, { useRef, useState } from 'react'

function useAddPost(token,urls) {
    const [response,setResponse] = useState()
    const [error,setError] = useState()
    const formRef = useRef()
  return [response,error,formRef]
}

export default useAddPost