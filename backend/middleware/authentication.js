const jwt = require('jsonwebtoken')
const User = require('../model/model')

const authentication = (req,res,next) => {
    if(!req.headers.authorization) {
        res.status(401).json({status : 'unauthorised access'})
        return
    }
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,"q1q1q1",async(err,decode)=>{
        if(err) {
            res.status(401).json({status : 'invalid token'})
            return
        }
        else{
            console.log(decode);
            const data = await User.findById(decode.userId)
            req.dataFromMiddleware = data
            console.log('middleware working xxx');
            next()
            // const abpath = path.join(__dirname,'uploads',data.name)
            // express.static(abpath)
        }
    })
}
module.exports = authentication