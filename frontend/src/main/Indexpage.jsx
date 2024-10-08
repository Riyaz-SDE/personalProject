import { Route, Routes } from "react-router-dom"
import Login from "./login/Login"
import Profile from "./profile/Profile"
import Users from "./users/Users"
import { OthersProfile } from "./othersProfile/OthersProfile"
import ProfileCard from "./components/ProfileCard"
import Follows from "./follows/Follows"
import CreatePost from "./profile/UserPosts/CreatePost"
import PostPage from "./profile/UserPosts/post_page/PostPage"


const Indexpage =()=>{
    return(
        <>
        
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/profile/posts/:username" element={<PostPage/>}/>
            <Route path="/profile/addPost" element={<CreatePost/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/users/:id" element={<OthersProfile/>}/>
            <Route path="/posts/:username" element={<PostPage isNotprofile={true}/>}/>
            <Route path="/followers/:id" element={<Follows/>}/>
            <Route path="/followings/:id" element={<Follows/>}/>
            <Route path="/c" element={<ProfileCard/>}/>
        </Routes>
        </>
    )
}
export default Indexpage