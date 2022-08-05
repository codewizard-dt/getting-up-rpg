const router = require('express').Router()

router.use('/choices', require('./choice-routes'))
router.use('/dilemmas', require('./dilemma-routes'))
router.use('/user', require('./user-routes'))

module.exports = router