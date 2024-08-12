const express =require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const body=require('body-parser')
const connect = require('./dbconnect')
const fs = require('fs')
const path = require('path')
const bcryt = require('bcrypt')
const jwt = require('jsonwebtoken')



app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
const User = require('./model')

// app.get('/',(req,res)=>{
//     console.log(req.body);
//     res.status(200).json({l:0})
// })
app.use('/',require('./Routes/get'))
// ====================================
// app.use('/auth',require('./Routes/auth'))
// =====================================

// creating user and stores hashed password in mongodb
app.use('/post',require('./Routes/createUser'))
// app.post('/post',async(req,res)=>{
//     // console.log(req.body);
//     // const data = await req.body
//     // console.log(data);
//     const {name,password} =  req.body
    
//     const hash = await bcryt.hash(password,10)
//     if(name===""&&password===""){
//         res.json({status:"empty"})
//     }
//     else{
//         let filepath =  path.join(__dirname,'uploads',name)
//         fs.mkdir(filepath,(err)=>{
//             if(err){
//                 console.log(err,'error occured');
//             }
//             else{
//                 console.log('folder created');
//             }
//         })
//         const login = await User.insertMany({name:name,password:hash,path:filepath})
//         res.status(200).json({status:'success'})
//     }
// })
// ===============================================================creating user

app.use('/log',require('./Routes/login'))

// app.post('/log',async(req,res)=>{
//     try{console.log(req.body);
//     const { name , password } =  req.body;
//     // console.log(data);
//     const user = await User.find({name})
//     console.log(Boolean(user.length));
//     if(user.length === 0){
//         return res.status(404).json({error:'not found'})
//         // console.log('k');
//     }
//     console.log(user,password);
//     const isPassvalid = await bcryt.compare(password,user[0].password)
//     if(!isPassvalid){
//         return res.status(401).json({error:"invalid password"})
//     }
//     // console.log(user[0]._id,'lllll');
//     // generate token
//     const token = jwt.sign({userId:user[0]._id},"q1q1q1");
//     res.json({token})}
//     catch(err){
//         console.log(err);
//         res.status(500).send("internal server error")
//     }
//     // // if(user && user[0].name === data.name && user[0].password===data.password){
//     //     if(user.length!==0){
//     //     console.log(user,'success');
//     //     res.json({status:"success",...user})
//     // }
//     // else{
//     //     res.json({
//     //         status:"not"
//     //     })
//     //     console.log('not');
//     // }


// })

app.get('/protected',async(req,res,next)=>{
    console.log('l');
    const token = req.headers.authorization.split(" ")[1]
    console.log( req.headers.authorization.split(" ")[1]);
    const verify = jwt.verify(token,"q1q1q1",async(err,decode)=>{
        if(err) return
        else{
            console.log(decode);
            const data = await User.findById(decode.userId)
            res.json(data)
            const abpath = path.join(__dirname,'uploads',data.name)
            express.static(abpath)
        }
    })
})

const createUserFolder = (req, res, next) => {
    const userId = req.body.object; // Assuming you have user information stored in req.user after authentication
    console.log(req.body,1);
    // const userUploadsFolder = path.join('uploads', userId);
    // if (!fs.existsSync(userUploadsFolder)) {
    //     fs.mkdirSync(userUploadsFolder);
    // }
    // req.userUploadsFolder = userUploadsFolder;
    // console.log(userUploadsFolder);
    // next();
};
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        // const name = req.body.object
        // const pathname = path.join(__dirname,'uploads',file.object)
        const pathname = path.join(__dirname,'uploads',req.query.name)

        console.log(pathname);
        // console.log(__dirname,'uploads',req.query.name);
        console.log('======');
        console.log(file);
        // cb(null,String(pathname))
        // cb(console.log("0"),'uploads/')
        cb(console.log("0"),pathname)
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    }
})
const uploads = multer({storage:storage})


app.post('/log/pic',uploads.single("ProfilePic"),async(req,res)=>{
    try{
    console.log(req.file);
    console.log(req.query.name);
    // const file = await User.find({"name":req.query.name})
    // console.log(file);
    const fileUpload = await User.updateOne({"name":req.query.name},
    {"$set":{"profile.path" : req.file.path}})

    if(fileUpload.modifiedCount===0){
        return res.status(404).json({error:'not changed'})
    }
    res.status(200).json({message:'corect'})
    console.log(fileUpload);
        }
    catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }

})
app.listen('5000',(req,res)=>{
    console.log('server is running');
})