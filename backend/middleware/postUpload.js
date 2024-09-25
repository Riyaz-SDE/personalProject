const multer = require("multer");
const path  = require("path");

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log('folder destination creating')
        console.log(req.dataFromMiddleware)
        console.log(req.dataFromMiddleware.username);
        const pathname = path.join(path.dirname(__dirname),'uploads',req.dataFromMiddleware.username,'posts')
        console.log('pathname',pathname);
        cb(null,pathname)
        console.log(file);
        console.log(pathname);
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    }
})
const uploads = multer({storage:storage})

module.exports={uploads}