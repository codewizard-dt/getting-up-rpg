const router = require('express').Router()
const { Dilemma, Choice } = require('../models')
const apiRoutes = require('./api')

router.use('/api', apiRoutes)

// homepage
router.get('/', (req, res) => {
  res.render('game')
})

// game start
router.get('/game', async (req, res) => {
  try {
    const dilemma = await Dilemma.getJsonByPk(1, {
      include: {
        model: Choice,
        attributes: ['id', 'description'],
      }
    })
    req.session.save(() => {
      req.session.crisis_level = 0
      req.session.time_left = 60 * 3.5
      req.session.preparedness = 0
      const { title, description, choices } = dilemma
      res.render('game', { dilemma: { title, description }, options: choices })
    })

    // res.render('game')
  } catch (error) {
    console.error(error);
    res.status(500).json('Error')
  }

})

// game over
router.get('/game-over', (req, res) => {
  res.send('Game over')
})


module.exports = router