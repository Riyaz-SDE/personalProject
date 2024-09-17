import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Img from "../Img";
import useFollow from "./useFollow";

export const OthersProfile = () =>{
    const {id} = useParams()
    const [data,setData] = useState({})
    useEffect(()=>{
        const fetch = async ()=>{
            try{
                console.log(id);
                const data = await axios.get(`http://127.0.0.1:5000/getUsers?id=${id}`)
                console.log(data.data);
                setData(data.data.data)
                console.log(`${data.data.data.path}"\+ ${data.data.data.profile.fileName}`);
            }
            catch(err) {console.log(err);}
        }
        fetch()
        return ()=> fetch
    },[id])
    
    const [follow,unfollow] = useFollow(localStorage.getItem("userId"),id)
    const followAction = () => {
        if(data?.followers.filter(e => e.userId === localStorage.getItem("userId"))[0]?.userId){
            console.log('unfollow')
            return unfollow()
        }
        console.log('follow')
        return follow()
    } 
    console.log('other-user-data',data)
   if(data.username){
        return(
            <>
            <img src={`http://127.0.0.1:5000/protected/uploads/${data.profile.path?data.username+'/'+data.profile.fileName:'DEFAULT.webp'}`}
            style={{width:'100px',aspectRatio:'1/1',borderRadius:'50%'}}/>
            <h1>Name : {data.username} </h1>
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
                {data.followers[0]?.userId}
            <button onClick={() => {followAction()}}>
                {/* Now task is to find user followed or not */}
                {data?.followers.filter(e => e.userId === localStorage.getItem("userId"))[0]?.userId ? 'un':''} Follow</button>
            </>
        )
    }
    return <>null</>
}