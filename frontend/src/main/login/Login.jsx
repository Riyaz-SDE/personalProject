import axios from "axios"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const Login =()=>{
    const[initial,setInitial]=useState(null)
    const nameRef = useRef()
    const passRef = useRef()
    const navigate = useNavigate()
   
    const handleSubmit= async(e)=>{
        e.preventDefault()
        const credentials ={
            name:nameRef.current.value,
            password:passRef.current.value
        }
        const req = await axios.post(`http://127.0.0.1:5000/post`,credentials)
        console.log(req.data);
        
        console.log(credentials);
    }
    const handleLogin = async()=>{
        try {
            const credentials ={
                name:nameRef.current.value,
                password:passRef.current.value
            }
            console.log(credentials);
            const req = await axios.post(`http://127.0.0.1:5000/log`,credentials)
            const user = req.data
            console.log(user);
            if(user.token){
                localStorage.setItem("token",user.token)
                navigate('/profile')
                return
            }
            console.log('no token');
        } catch (error) {
            console.log(error);
        }
        
    }
    return(
        <>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder="username" ref={nameRef} />
            <input type="password" placeholder="password" ref={passRef}/>
            <input type="submit"  value={`Register`}/>
        </form>
        <button onClick={handleLogin}>Login</button>
        </>
    )
}
export default Login;