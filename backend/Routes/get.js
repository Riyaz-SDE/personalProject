const express = require('express')
const router = express.Router()

router.get('/',require('../controller/getController'))

module.exports = router