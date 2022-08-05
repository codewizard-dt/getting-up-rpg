const { Choice, Outcome } = require('../../models')
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
  const randomOutcome = getRandom(weightedOutcomes)
  const { crisis_change, preparedness_change, time_change } = randomOutcome

  req.session.save(() => {
    req.session.crisis_level += crisis_change
    req.session.time_left += time_change
    req.session.preparedness += preparedness_change
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