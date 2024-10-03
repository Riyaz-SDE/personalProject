import React, { Suspense,  } from "react";
import {  Link, useNavigate } from "react-router-dom";
import useAuth from "./customHook/useAutoRedirect";
import useFileUpload from "./customHook/useFileUpload";

// const TOKEN_GET = `http://127.0.0.1:5000/protected`
// const FILE_POST = `http://127.0.0.1:5000/log/pic`
const token = localStorage.getItem("token")
const Imgs = React.lazy(()=> import('../Img'))
let x = 0

const Profile = ()=>{
    x++
    
    const navigate = useNavigate()
    console.log(`profile ${token}`)
    const [data, error, loading,setData] = useAuth(token)
   
    const [
        status,
        fileUploadError,
        uploadFile,
        inputFileRef] = useFileUpload(token,setData)
   
        console.log(`file upload hook status: ${status}
        fileupload: ${fileUploadError}`)
function hlogout(){
            localStorage.clear()
            navigate('/')
}
    


if(data !== undefined){
    return(
        <>
            <h1>Profile</h1>
            <Suspense fallback={<>loading...</>} >
                <Imgs src={`http://127.0.0.1:5000/protected/uploads/${data?.profile.path ? data.username +'/'+(data.profile.fileName)
                :'DEFAULT.webp'}`} sty/>
            </Suspense>
            <h1>{data.username}</h1>

            <table>
                <tr>
                    <th>followers</th>
                    <th>following</th>
                </tr>
                <tr>
                    <td>{data.followers.length}</td>
                    <td>{data.followings.length}</td>
                </tr>
            </table>

            <button onClick={hlogout}>Logout {x}</button>
            <br />
            <div style={{display:"flex",gap:"20px",margin:'20px'}}>

                <input type="file" name="" id="" ref={inputFileRef} 
                style={{border:'1px solid #666',padding:'10px'}} 
                placeholder="upload" />
                
                <div className="upload_module">
                    <button onClick={uploadFile}>{status ? 'file uploading': (fileUploadError?`fileUploadError`:`test`)}</button>
                </div>
                <Link to={'/users'}>Users</Link>
                <Link to={'/profile/addPost'}>addPost</Link>
                <Link to={`/profile/posts/${data.username}`}>post</Link>
            </div>
        </>
    )    
}
return (<>lod{x}</>)
    
}
export default Profile;

