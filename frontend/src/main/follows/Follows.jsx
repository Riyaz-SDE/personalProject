import React from 'react'
import useFetch from '../utils/useFetch'
import { useParams } from 'react-router-dom'
import api from '../utils/api/api'
import align from './fun'

function Follows() {
    let {id} = useParams()
    const searchParams = new URLSearchParams(window.location.search).get("followings")

    const [data,loading,err] = useFetch(api.follow+id+`&params=${searchParams}`)
    console.log(data,loading,err)
    // if (err) return <div>Err: {err.message}</div>;
    console.log(searchParams)
  return (
    <div>
        <div style={{whiteSpace:"pre-line"}}>
          <h1>XYX</h1>
          <h1>{loading ? 'loading...' : ''} </h1>
          <h2>
            {(()=>{
              if(data && data.status === 200){
                 return data.data.data[searchParams === "true"? "followings" : "followers"]
                 .map(e => <div>{e.username}</div>)
                }else if(data && data.status === 204 && searchParams === "true"){
                  console.log('inside',searchParams);
                  return ('No Followings')
                }else if(data && data.status === 204 && searchParams === "false"){
                  return ('No Followers')
              }
            })()}
            {/* {data && 
            (
              ( 
                (data.status === 200 ) 
                && 
                (data.data.data[searchParams === "true"? "followings" : "followers"]
                .map(e => <div>{e.username}</div>))
              )
              ||
              (
                (data.status === 204 )
                &&
                (searchParams === "true"?'No Followings':'No Followers')
              )
            )} */}
          </h2>
          <h6>{
          (()=>{
            if(!data && err && err.message === 'Network Error') {
              return <h1> Server Not Responding </h1>
            }else if(!data && err && err.code === 'ERR_BAD_REQUEST'){
              return <h1>Bad Request 404</h1>
            }else{
              // return <h1>SomeThing Wrong</h1>
            }
          })()
        }</h6>
        
        </div>
    </div>
  )
}

export default Follows