import React from 'react'
import useAddPost from './useAddPost'
const token = localStorage.getItem("token")
const urls = {
  POST_API:``,
  
}
function CreatePost() {
  const [response,error,formRef] = useAddPost(token,urls)
  return (
    <>
  
    <form style={{display:"flex",flexFlow:'column',gap:"20px"}} ref={formRef}>
      <div>
        <label htmlFor="post-file">upload : </label>
        <input type="file" name='post-file'/>
      </div>
      <div style={{
        display:'flex',flexFlow:'column',
        border:'1px solid #999',
        padding:'10px'}}>
        <label>caption</label>
        <textarea name="caption" placeholder='Type Here' cols={50}> </textarea>
      </div>
    </form>

    </>
  )
}

export default CreatePost