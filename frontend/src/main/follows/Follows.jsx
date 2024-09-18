import React from 'react'
import useFetch from '../utils/useFetch'
import { useParams } from 'react-router-dom'
import api from '../utils/api/api'
import align from './fun'

function Follows() {
    let {id} = useParams()
    const searchParams = new URLSearchParams(window.location.search)
    const [data,loading,err] = useFetch(api.follow+id+`&params=${searchParams.get('followings')}`)
    console.log(data,loading,err)
    if(data === undefined){
        return <h1>Loading</h1>
    }else if(data.status !== 200) {
        return <h1> Server Issue</h1>
    }
  return (
    <div>
        <div style={{whiteSpace:"pre-line"}}>
        {align(JSON.stringify(data.data))} <br/>

        </div>
    </div>
  )
}

export default Follows