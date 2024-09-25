import React, { Suspense,  } from "react";
import {  Link, useNavigate } from "react-router-dom";
import useAuth from "./customHook/useAutoRedirect";
import useFileUpload from "./customHook/useFileUpload";
// import ProfileCard from "./components/ProfileCard";
const TOKEN_GET = `http://127.0.0.1:5000/protected`
const token = localStorage.getItem("token")
const FILE_POST = `http://127.0.0.1:5000/log/pic`
const Imgs = React.lazy(()=> import('../Img'))
let x = 0

const Profile = ()=>{
    x++
    // -- >4
    const navigate = useNavigate()
    const [data, error, loading] = useAuth(token,TOKEN_GET)
    // 1-->
    const [
        status,
        fileUploadError,
        uploadFile,
        inputFileRef] = useFileUpload(token,FILE_POST,TOKEN_GET,TOKEN_GET)
    // 2-->

function hlogout(){
            localStorage.clear()
            navigate('/')
}
    localStorage.setItem("userId",data?._id)

// console.log('state',data,data?.username,(data?.profile?.path.split(data?.username).pop().slice(1)));
// --3
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
                
                <button onClick={uploadFile}>test</button>
                <Link to={'/users'}>Users</Link>
                <Link to={'/profile/addPost'}>addPost</Link>
            </div>
        </>
    )    
}
return (<>lod{x}</>)
    
}
export default Profile;

// 3-- > // if(Object?.keys(data)?.length){
// 4-- > // const [name,setName]=useState("")
    // // const[data,setdata]=useState({})
    // const[ren,setRen]=useState(false)

// useEffect( ()=>{
    //     const fetch = ()=>{
    //         const token = localStorage.getItem('token')
    //     if(!token){
    //         localStorage.clear()
    //         navigate('/')
    //         console.log(2);
    //         console.log(token);
    //     }
    //         axios.get(`http://127.0.0.1:5000/protected`,{headers:{Authorization:`bearer ${token}`}})
    //         .then(res =>{
    //             console.log(res);
    //             setdata(data => data = res.data)
    //             console.log('state',data);
    //         })
    //         .catch(err=>{
    //             console.log(err);
    //         })
    //     }
    //     fetch()
    // },[]) ----> 1

// const fref = useRef()

// const file = async() =>{
//     const e=fref.current
//     const file = await e.files[0]
//     console.log(file);
//     if(!file){
//         console.log('error');
//         return
//     }
//     const formdata = new FormData()
//     formdata.append("ProfilePic",file)
//     formdata.append("object",name)
//     console.log(name);
//     console.log(formdata.get("object"));
//     try{
//         await axios.post(`http://127.0.0.1:5000/log/pic?`, formdata, {
//         headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
//     });
//     console.log('File uploaded successfully');

//     // Fetch updated data after uploading the file
//     const response = await axios.get(`http://127.0.0.1:5000/protected`, {
//         headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
//     });
//     console.log('User data fetched:', response.data);

//     // Update state with the fetched data
//     setdata(response.data);
//     setRen(prevRen => !prevRen);
// } catch (error) {
//     console.error('Error:', error);
// }
// } ---> 2