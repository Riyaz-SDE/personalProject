const authentication = require('../../middleware/authentication')
const { addPost, deletePost, getPost } = require('./postHandlers')

const route = require('express').Router()

route.get('/:username',getPost)
route.post('/',authentication,require('../../middleware/postUpload').uploads.single("post"),addPost)
route.delete('/',authentication,deletePost)
// route.put()

module.exports = route