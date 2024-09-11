const express =require('express')
const app = express()
const cors = require('cors')
const connect = require('./dbconnect')


app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
const User = require('./model/model')


app.use('/',require('./Routes/get')) // for demo purpose
// ====================================
// app.use('/auth',require('./Routes/auth'))
// =====================================

/**
 * creates user and stores hashed password in mongodb
 */
app.use('/post',require('./Routes/createUser')) // for user registration

/**
 * for user login and generate JWT token 
 */
app.use('/log',require('./Routes/login')) // for user login

/**
 * @protected
 * token give a user information object from DB
 * and also has /protected/uploads/DEFAULT.webp
 */
app.use('/protected',require('./Routes/protected')) // routed protected by JWT 

/**
 * file upload using multer
 */
app.use('/log/pic',require('./Routes/upload'))

/**
 * @motive - its a search api
 * temporaly it will only list all exisiting user
 */
app.use('/users',require('./Routes/userList'))

/**
 * not used yet
 */
app.use('/search',require('./Routes/searchUser'))

/**
 * this will get user details by their unique Id in DB
 */
app.use('/getUsers',require('./Routes/getUsers'))

/**
 * follow request api
 */
app.use('/follow',require('./Routes/connection/follow'))
/**
 * get followers api
 */
app.use('/',require('./Routes/connection/getOwnFollowers'))

app.listen('5000',(req,res)=>{
    console.log('server is running');
})