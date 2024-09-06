import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// let page = 0
const Users = () =>{
    const [pageNum,setPage]=useState(0)
    const nav= useNavigate()
    const[list,setList]=useState([])
    console.log(pageNum);
    useEffect(()=>{
        // setList(list=>list=[{name:'riyaz'},{name:'riyaz'},{name:'riyaz'},{name:'riyaz'}])
        const fetch = async ()=>{
            try{
                let list = await axios.get(`http://127.0.0.1:5000/users`)
                setList(list.data)
                console.log(list);
            }
            catch(err){
                console.log(err);
            }
        }
        fetch()
    },[])
    async function search () {
       try{
        let data =await axios.post(`http://127.0.0.1:5000/search`,{search:'sa'})
        console.log(data.data);
       }
       catch(err){
        console.log(err);
       }
    }
    // async function next(){
    //     setPage(prv=>prv=prv+1)
    //     let data = await axios.get(`http://127.0.0.1:5000/users?search=${pageNum}`)
    //     console.log(data.data);
    //     setList(data.data)
    // }
    // async function prv(){
    //     setPage(prv=>prv=prv-1)
    //     if(pageNum<0) return console.log('notvalid');
    //     let data = await axios.get(`http://127.0.0.1:5000/users?search=${pageNum}`)
    //     console.log(data.data);
    //     setList(data.data)
    // }
    const navigate = (e)=>{
        console.log(list);
        nav(`/users/${e}`,{replace:true})
    } 
    return(
        <>
        {list.length!==0?list.map((e,i)=>{
            return(
                <div key={i} onClick={()=>navigate(e._id)} style={{backgroundColor:'#ddd',display:'flex',gap:'10px',alignItems:'center'}}>
                    <img style={{width:'100px',aspectRatio:'1/1',borderRadius:'50%'}} 
                    src={`http://127.0.0.1:5000/protected/uploads/${e.profile.path ? e.name + '/' + e.profile.fileName:e.profile.fileName}`} alt="" />
                    <Link to={`/users/${e._id}`}>{e.name}</Link>
                </div>
            )
        }):'false'}
        <button onClick={search}>search</button>
        {/* {pageNum!=0&&<button onClick={prv} > previous</button>}
        <button onClick={next}>next</button> */}
        </>
    )
}
export default Users;