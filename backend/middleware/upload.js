
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../model')

function authMiddleware(req, res, next) {
   
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,"q1q1q1",async(err,decode)=>{
        if(err) return
        // else{
            console.log(decode,token);
            const data = await User.findById(decode.userId)
            res.json(data)
            req.customData = {token:data}
            console.log('=========================');
            console.log(data);
            next()
        // }
    })
}


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        // const name = req.body.object
        // const pathname = path.join(__dirname,'uploads',file.object)
        console.log(req.customData.token.name);
        const pathname = path.join(path.dirname(__dirname),'uploads',req.customData.token.name)
        console.log(pathname);
        cb(null,pathname)
        console.log(file);
        console.log(pathname);
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    }
})
const uploads = multer({storage:storage})

module.exports={uploads,authMiddleware}