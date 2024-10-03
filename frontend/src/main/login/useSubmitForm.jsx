import axios from 'axios'
import { api } from '../Api/api'

const userRegistrationUrl = api.userRegisteration
const userLogingUrl = api.login

function useSubmitForm(nameRef,passRef,navigate) {

    const handleSubmit= async(e)=>{
        e.preventDefault()
        const credentials ={
            name : nameRef.current.value,
            password : passRef.current.value
        }
        try {
            const req = await axios.post(userRegistrationUrl,credentials)
            console.log(`user registration respose${req.data} \n credentials : ${credentials}`);    
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogin = async()=>{
        try {
            const credentials ={
                name : nameRef.current.value,
                password : passRef.current.value
            }
            const req = await axios.post(userLogingUrl,credentials)
            console.log(`user registration respose${req.data} \n credentials : ${credentials}`);

            if(req.data.token){
                localStorage.setItem('token',req.data.token)
                navigate('/profile')
                console.log(`token setted`)
                return
            }
            console.log('no token');

        } catch (error) {
            console.log(error);
        }   
    }
    return [handleSubmit,handleLogin]
}

export default useSubmitForm