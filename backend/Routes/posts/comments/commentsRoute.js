const authentication = require('../../../middleware/authentication')
const checkObjectId = require('../middleware/checkObjectId')
const { checkPostMiddleware } = require('../middleware/checkPostMiddleware')
const { addComment, getComment, deleteComment } = require('./commentsHandlers')

const route = require('express').Router()

route.get('/:username/:postId',checkObjectId,checkPostMiddleware,
    getComment)
route.post('/:username/:postId',checkObjectId,checkPostMiddleware,
    authentication,addComment)
route.delete('/:username/:postId',checkObjectId,checkPostMiddleware,
    authentication,deleteComment)

module.exports = route