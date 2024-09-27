const { like, unLike } = require('./likesHandlers')

const route = require('express').Router()

// route.get('/')
route.post('/',like)
route.put('/',unLike)

module.exports = route