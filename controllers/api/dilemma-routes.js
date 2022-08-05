const { Op } = require('sequelize')
const { Dilemma, Choice, Outcome } = require('../../models')
const tryCatchHandler = require('../../utils/tryCatchHandler')

const router = require('express').Router()

router.get('/initial', tryCatchHandler(async (req, res) => {
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
    res.status(200).json(dilemma)
  })

}))

router.get('/random', tryCatchHandler(async (req, res) => {
  const { crisis_level } = req.session
  const dilemma = await Dilemma.getRandomJson({
    where: {
      min_crisis_level: { [Op.gte]: crisis_level }
    }
  })
  res.json(dilemma)
}))

module.exports = router