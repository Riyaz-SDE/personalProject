const { addPost, deletePost } = require('./postHandlers')

const route = require('express').Router()

// route.get('/',)
route.post('/',require('../../middleware/postUpload').uploads.single("post"),addPost)
route.delete('/',deletePost)
// route.put()

module.exports = route