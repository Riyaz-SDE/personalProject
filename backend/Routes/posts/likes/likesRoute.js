
const authentication = require('../../../middleware/authentication')
const { checkPostMiddleware } = require('../middleware/checkPostMiddleware')
const { like, unLike, getLike } = require('./likesHandlers')
const checkObjectId = require('../middleware/checkObjectId')

const route = require('express').Router()

// route.get('/')
/**
 *  check post exist
 */

route.get('/:username/:postId',checkObjectId,checkPostMiddleware,
    getLike)
route.post('/:username/:postId',checkObjectId,checkPostMiddleware,
    authentication,like)
route.delete('/:username/:postId',checkObjectId,checkPostMiddleware,
    authentication,unLike)

module.exports = route