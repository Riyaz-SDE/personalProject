const { authMiddleware } = require('../../middleware/upload')

const route = require('express').Router()

route.post('/',(req,res) => {
    res.status(200).json({message: 'sucesss', data: req.customData})
})
module.exports = route