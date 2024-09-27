const { authMiddleware } = require('../../middleware/upload')
const User = require('../../model/model')
const { deletePost } = require('./postHandlers')

const route = require('express').Router()


route.delete('/', deletePost )



module.exports = route