import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Profile from "./Profile"
import Users from "./Users"
import { OthersProfile } from "./OthersProfile"


const Indexpage =()=>{
    return(
        <>
        
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/users/:id" element={<OthersProfile/>}/>
        </Routes>
        </>
    )
}
export default Indexpage