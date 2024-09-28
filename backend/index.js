const express =require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const connect = require('./dbconnect')
const authentication = require('./middleware/authentication')
const { authMiddleware } = require('./middleware/upload')


app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
// const User = require('./model/model')
// const authentication = require('./middleware/authentication')


app.use('/',require('./Routes/get')) // for demo purpose
// ====================================
// app.use('/auth',require('./Routes/auth'))
// =====================================

/**
 * creates user and stores hashed password in mongodb
 */
app.use('/post',require('./Routes/general/createUser')) // for user registration

/**
 * for user login and generate JWT token 
 */
app.use('/log',require('./Routes/general/login')) // for user login

/**
 * @protected
 * 2 - token give a user information object from DB
 * 1 - for has /protected/uploads/DEFAULT.webp
 */
app.use('/protected/uploads',express.static(path.join(__dirname,'uploads'))) // routed protected by JWT 
app.use('/protected',authentication,require('./Routes/general/protected')) // route protected by JWT

/**
 * file upload using multer
 */
app.use('/log/pic',require('./Routes/general/upload'))

/**
 * @motive - its a search api
 * temporaly it will only list all exisiting user
 */
app.use('/users',require('./Routes/general/userList'))

/**
 * not used yet
 */
app.use('/search',require('./Routes/searchUser'))

/**
 * this will get user details by their unique Id in DB
 */
app.use('/getUsers',require('./Routes/general/getUsers'))

/**
 * @GET
 * get followers api
 */
app.use('/getfollow',require('./Routes/connection@/getfollow'))
/**
 * @POST
 * follow request api
 */
app.use('/follow',require('./Routes/connection@/follow'))
/**
 * @POST
 * unfollow api
*/
app.use('/unfollow',require('./Routes/connection@/unFollow')) 


/**
 * add post
 */
// app.use('/addPost',authentication, require('./Routes/posts/addPost'))
// app.use('/deletePost',authentication, require('./Routes/posts/deletePost'))
app.use('/addPost',require('./Routes/posts/postRoute'))
app.use('/like',require('./Routes/posts/likes/likesRoute')) 
app.use('/comments',authentication,require('./Routes/posts/comments/commentsRoute'))
app.use('/getPost', require('./Routes/posts/getPost'))
app.listen('5000',(req,res)=>{
    console.log('server is running');
})