const tryCatchHandler = require('../../utils/tryCatchHandler')

const router = require('express').Router()

router.post('/name', tryCatchHandler(async (req, res) => {
  req.session.save(() => {
    req.session.user_name = req.body.user_name
    res.json(req.body.user_name)
  })
}))

router.get('/status', (req, res) => {
  const { user_name, crisis_level, preparedness, time_left } = req.session
  res.json({
    user_name,
    crisis_level, preparedness, time_left
  })
})

module.exports = router