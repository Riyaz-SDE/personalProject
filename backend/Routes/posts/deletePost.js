const { authMiddleware } = require('../../middleware/upload')

const route = require('express').Router()

route.delete('/',(req,res) => {
    res.status(200).json({message: 'post deleted', data: req.customData})
})
module.exports = route