const express =require('express')
const app = express()
const cors = require('cors')
const connect = require('./dbconnect')


app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
const User = require('./model')


app.use('/',require('./Routes/get'))
// ====================================
// app.use('/auth',require('./Routes/auth'))
// =====================================

// creating user and stores hashed password in mongodb
app.use('/post',require('./Routes/createUser'))

// ===============================================================creating user

app.use('/log',require('./Routes/login'))

// ================================================================

app.use('/protected',require('./Routes/protected'))

// ========================file upload
app.use('/log/pic',require('./Routes/upload'))

app.use('/users',require('./Routes/userList'))
app.use('/search',require('./Routes/searchUser'))
app.use('/getUsers',require('./Routes/getUsers'))
app.listen('5000',(req,res)=>{
    console.log('server is running');
})