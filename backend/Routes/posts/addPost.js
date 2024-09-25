// const { authMiddleware } = require('../../middleware/upload')
const User = require('../../model/model')

const route = require('express').Router()

route.post('/', require('../../middleware/postUpload').uploads.single("post"),
 async (req,res) => {
    try {
        const userData = req.customData
        console.log(userData);
        res.status(200).json({message: 'sucesss', data: req.customData})
    } catch (error) {
        console.log(error);
    }
})
module.exports = route