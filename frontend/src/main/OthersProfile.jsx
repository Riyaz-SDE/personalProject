import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Img from "./Img";

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
                console.log(`${data.data.data.path}+"\+ ${data.data.data.profile.fileName}`);
            }
            catch(err) {console.log(err);}
        }
        fetch()
        return ()=> fetch
    },[id])
   
   if(data.name){return(
        <>
        {/* <div>{JSON.stringify(data)}</div>    */}
        <img src={`http://127.0.0.1:5000/protected/uploads/${data?'/'+data.name+'/'+data.profile.fileName:'DEFAULT.webp'}`}/>
        {data.name}
        </>
    )}return <>null</>
}