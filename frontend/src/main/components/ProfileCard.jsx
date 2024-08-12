import React from "react"
import '../css/profilecard.css'
// import img from '../css/intricity.jpg'
const ProfileCard = ()=>{
    return(
        <>
        <div className="profile-wrapper">
            <div className="cover">
                <img src={img} alt="" />
            </div>
            <div className="profile"><img src={img} alt="" /></div>/
            <div className="userName"><h1>RIyaz</h1><p>@NeetCode
‧
664K subscribers
‧
354 videos</p></div>
            {/* <div className="others"></div> */}
        </div>
        </>
    )
}
export default ProfileCard