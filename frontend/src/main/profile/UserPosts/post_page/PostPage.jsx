import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../../Custom_hooks/useFetch'

function PostPage({isNotprofile}) {
  const {username} = useParams()
  const [postData,loading,error] = useFetch(`http://localhost:5000/addPost/${username}`)

  return(<div>
    <h1>POST OF USER {username}</h1>
    {(()=>{
      if(loading || (!postData&&!error)) return <h1> Loading...</h1>
      if(error) return <h1>Error occures</h1>
      if(postData.status = 200) {
        const posts = postData.data.data.posts
        console.log(posts)
        return(
          <>
          {posts.length === 0 ? <h2>No Post</h2>:
          (
            <>
            {posts.map((e,i) => {
              return(
                <div style={{
                  display:'flex',
                  flexFlow:'column',
                  alignItems:'center',
                  gap:'20px',
                  border:'1px solid #000',
                  margin:'50px 10px'
                }}>

                <h1>post no : {i+1}</h1>
                <h1>Date ---- {e.date} </h1>
                
                <h1 style={{display:'flex',alignItems:'center'}}>
                  Img
                  <img src={`http://localhost:5000/protected/uploads/${username}/posts/${e.file}`} 
                style={{width: '100px',aspectRatio:'square'}}/>
                </h1>  
                
                <h1>Content : {e.content}</h1>
                <h1>likes : {e.likes.length}</h1>
                <button>Like</button>
                <h1>comments : {e.comments.length}</h1>
                <button>Comment</button>
                {!isNotprofile&&<button>delete</button>}
                </div>
              )
            })}
            </>
          )}
          </>
        )
      }
    })()}
  </div>)
  
 
  
 
}

export default PostPage