const { authMiddleware } = require('../../middleware/upload')

const route = require('express').Router()

route.get('/',(req,res) => {
    res.status(200).json({message: 'post getted', data: req.customData})
})
module.exports = route