const { Choice } = require('../models')

const choiceData = [
  {
    description: `Go back to sleep, turn off alarm`,
    dilemma_id: 1,
  },
  {
    description: `Get out of bed`,
    dilemma_id: 2,
  },
  {
    description: `Hit snooze`,
    dilemma_id: 3,
  },
  {
    description: `Ignore your phone`,
    dilemma_id: 4,
  },
  {
    description: `Chuckle and send the meme to your friend`,
    dilemma_id: 5,
  },
  {
    description: `Check out the comment section...`,
    dilemma_id: 6,
  },
  {
    description: 'Brush your teeth.',
    dilemma_id: 7,
  },
  {
    description: 'Take a shower.',
    dilemma_id: 8,
  },
  {
    description: 'Who are you performing for? (leave bathroom having done nothing)',
    dilemma_id: 9,

  },

  {
    description: 'Make yourself a coffee',
    dilemma_id: 10,
  },

  {
    description: 'Take your Prozac',
    dilemma_id: 11,
  },
  {
    description: 'Must you always rely on substances? (leave kitchen having done nothing)',
    dilemma_id: 12,
  },
  {
    description: 'Start Class',
    dilemma_id: 13,
  },
  {
    description: 'One final task before class',
    dilemma_id: 14,
  },
  {
    description: 'Skip class',
    dilemma_id: 15,
  }

]

const seedChoices = () => Choice.bulkCreate(choiceData)

module.exports = seedChoices