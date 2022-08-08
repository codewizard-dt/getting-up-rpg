const { Dilemma } = require('../models')

const dilemmaData = [
  {
    title: 'Wake Up',
    description: `It’s a Monday.\n6:30 AM.\nAn alarm chirps from your phone.`,
    location: 'bedroom',
    initial: true
  },
  {
    title: 'Beep beep',
    description: `You come across the funniest meme on Reddit.`,
    location: 'any'
  },
]

const seedDilemmas = () => Dilemma.bulkCreate(dilemmaData)

module.exports = seedDilemmas