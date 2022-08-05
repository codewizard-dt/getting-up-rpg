const { Choice } = require('../models')

const choiceData = [
  {
    description: `Go back to sleep, turn off alarm`,
    dilemma_id: 1,
  },
  {
    description: `Get out of bed`,
    dilemma_id: 1,
  },
  {
    description: `Hit snooze`,
    dilemma_id: 1,
  },
  {
    description: `Ignore your phone`,
    dilemma_id: 2,
  },
  {
    description: `Chuckle and send the meme to your friend`,
    dilemma_id: 2,
  },
  {
    description: `Check out the comment section...`,
    dilemma_id: 2,
  },
]

const seedChoices = () => Choice.bulkCreate(choiceData)

module.exports = seedChoices