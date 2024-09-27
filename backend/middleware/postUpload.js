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
const fileFilter = (req, file, cb) => {
    // Accept images only
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true); // Accept file
    }
    cb(new Error('Only images are allowed!'), false); // Reject file
};
const uploads = multer({
    storage:storage,
    limits: { fileSize: 2 * 1024 * 1024 }, 
    fileFilter
})

module.exports={uploads}