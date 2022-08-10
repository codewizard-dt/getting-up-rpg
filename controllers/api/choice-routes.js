const { Choice, Outcome } = require('../../models')
const clamp = require('../../utils/clamp')
const getRandom = require('../../utils/getRandom')
const tryCatchHandler = require('../../utils/tryCatchHandler')
const withLikelihood = require('../../utils/withLikelihood')

const router = require('express').Router()

router.get('/:id', tryCatchHandler(async (req, res) => {
  const choice = await Choice.getJsonByPk(req.params.id, {
    attributes: ['id', 'description', 'dilemma_id'],
    include: {
      model: Outcome,
      through: {
        attributes: ['likelihood']
      }
    }
  })
  res.json(choice)
}))

router.get('/:id/random-outcome', tryCatchHandler(async (req, res) => {
  const choice = await Choice.getJsonByPk(req.params.id, {
    attributes: ['id', 'description', 'dilemma_id'],
    include: {
      model: Outcome,
      through: {
        attributes: ['likelihood']
      }
    }
  })
  if (!choice) return res.status(404).json({ error: `Choice ${req.params.id} not found` })

  const weightedOutcomes = withLikelihood(choice.outcomes)
  const randomOutcome = getRandom(weightedOutcomes) || {}
  const { crisis_change = 0, preparedness_change = 0, time_change = 0 } = randomOutcome

  req.session.save(() => {
    req.session.crisis_level = clamp(0, 100, crisis_change, req.session.crisis_level)
    // req.session.crisis_level = 100
    req.session.time_left += time_change
//     req.session.time_left = 0
    req.session.preparedness = clamp(0, 100, preparedness_change, req.session.preparedness)
    res.json({
      randomOutcome,
      currentState: {
        crisis_level: req.session.crisis_level,
        time_left: req.session.time_left,
        preparedness: req.session.preparedness
      }
    })
  })
}))

module.exports = router
