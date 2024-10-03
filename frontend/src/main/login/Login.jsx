import axios from "axios"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import useSubmitForm from "./useSubmitForm"

const Login =()=>{
    const[initial,setInitial]=useState(null)
    const nameRef = useRef()
    const passRef = useRef()
    const navigate = useNavigate()
   
    
    const [handleSubmit, handleLogin] = useSubmitForm(nameRef,passRef,navigate)
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