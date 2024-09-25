import React from 'react'
import useAddPost from './useAddPost'
const token = localStorage.getItem("token")
const urls = {
  POST_API:`http://localhost:5000/addPost`,
  
}
function CreatePost() {
  const [response,error,formRef,submit] = useAddPost(token,urls.POST_API)
  return (
    <>
  
    <form style={{display:"flex",flexFlow:'column',gap:"20px"}} ref={formRef} onSubmit={submit}>
      <div>
        <label htmlFor="post-file">upload : </label>
        <input type="file" name='post_file'/>
      </div>
      <div style={{
        display:'flex',flexFlow:'column',
        border:'1px solid #999',
        padding:'10px'}}>
        <label>caption</label>
        <textarea name="caption" placeholder='Type Here' cols={50}> </textarea>
      </div>
      <input type="submit" name="" id="" value={`submit`}/>
    </form>

    </>
  )
}

export default CreatePost