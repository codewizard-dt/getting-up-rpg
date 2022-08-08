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
  {
    description: 'Brush your teeth.'
    dilemma_id: 3,
  },
  { description: 'Take a shower.'
    dilemma_id: 3,
  },
    description: 'Who are you performing for? (leave bathroom having done nothing)'
    dilemma_id: 3,
  
  {
    description: 'Make yourself a coffee'
     dilemma_id: 3,
  },

  {
    description: 'Take your Prozac'
    dilemma_id: 3,
  },
  {
    description: 'Must you always rely on substances? (leave kitchen having done nothing)'
    dilemma_id: 3,
  }

]

const seedChoices = () => Choice.bulkCreate(choiceData)

module.exports = seedChoices