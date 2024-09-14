import React from 'react'

function useFetch(url) {
    useEffect( ()=>{
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
                console.log(res);
                setdata(data => data = res.data)
                console.log('state',data);
            })
            .catch(err=>{
                console.log(err);
            })
        }
        fetch()
        
    },[])
}

export default useFetch