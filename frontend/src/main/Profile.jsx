    import axios from "axios";
    import React, { Suspense, useEffect, useRef, useState } from "react";
    import {  Link, useNavigate } from "react-router-dom";
// import ProfileCard from "./components/ProfileCard";
    const Imgs = React.lazy(()=> import('./Img'))
    let x =0
    const Profile = ()=>{
        x++
        const [name,setName]=useState("")
        
        const[data,setdata]=useState({})
        const[ren,setRen]=useState(false)
        const navigate = useNavigate()
        
        useEffect( ()=>{
            console.log('l');
            const fetch = ()=>{
                const token = localStorage.getItem('token')
            if(!token){
                localStorage.clear()
                navigate('/')
                console.log(2);
                console.log(token);
            }
                axios.get(`http://127.0.0.1:5000/protected`,{headers:{Authorization:`bearer ${token}`}})
                .then(res =>{
                    // console.log(res.data);
                    setdata(data => data =res.data)
                })
                .catch(err=>{
                    console.log(err);
                })
            }
            fetch()
            
        },[])

    const fref = useRef()

    const file = async() =>{
        const e=fref.current
        // const file = await e.target.files[0]
        const file = await e.files[0]
        console.log(file);
        // console.log(file,name);
        if(!file){
            console.log('error');
            return
        }
        const formdata = new FormData()
        formdata.append("ProfilePic",file)
        formdata.append("object",name)
        console.log(name);
        console.log(formdata.get("object"));
        try{
            await axios.post(`http://127.0.0.1:5000/log/pic?name=${name}`, formdata, {
            headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
        });
        console.log('File uploaded successfully');

        // Fetch updated data after uploading the file
        const response = await axios.get(`http://127.0.0.1:5000/protected`, {
            headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
        });
        console.log('User data fetched:', response.data);

        // Update state with the fetched data
        setdata(response.data);
        setRen(prevRen => !prevRen);
    } catch (error) {
        console.error('Error:', error);
    }
        // axios.post(`http://127.0.0.1:5000/log/pic?name=${name}`,formdata,{headers:{Authorization:`bearer ${localStorage.getItem('token')}`}})
        // .then(res=>{console.log(res.data)})
        // .catch(err=>console.log(err))
        // axios.get(`http://127.0.0.1:5000/protected`,{headers:{Authorization:`bearer ${name}`}})
        //         .then(res =>{
        //             console.log(res.data);
        //             setdata(data => data = res.data)
        //             setRen(prv => prv = !prv)
        //         })
        //         .catch(err=>{
        //             console.log(err);
        //         })
        
            // Send the POST request to upload the file
    }

    function hlogout(){
                localStorage.clear()
                navigate('/')
    }
    if(Object.keys(data).length){return(
        <>
        {/* {<h1 style={{width:'100%',textAlign:'left',lineBreak:'auto'}}>{JSON.stringify(data)}</h1>} */}
        <Suspense fallback={<>''''''''''''</>} >
            <Imgs src={`http://127.0.0.1:5000/protected/uploads/${
            Object.keys(data).length && data.profile.path ? 
            data.name +'/'+(data.profile.path.split(data.name)[1].slice(1))
            :'DEFAULT.webp'}`}/>
        </Suspense>
        <h1>{data.name}</h1>
        
        <button onClick={()=>{
            hlogout()
        }}>Logout {x}</button>
        <input type="file" name="" id="" ref={fref} />
        {/* <img src={`http://127.0.0.1:5000/protected/uploads/${
            Object.keys(data).length && data.profile ? 
            data.name +'/'+(data.profile.path.split(data.name)[1].slice(1))
            :'DEFAULT.webp'}`} alt="null" /> */}
        {/* // ${data.name}/${Object.keys(data).length?data.profile.path.split(data.name)[1].slice(1):0}`} alt="null" /> */}
        <button onClick={()=>{file()}}>test</button>
        <Link to={'/users'}>Users</Link>
        </>
    )}
    return (<>lod{x}</>)
        
    }
    export default Profile;