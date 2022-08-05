const { Dilemma } = require('../models')

const dilemmaData = [
  {
    title: 'Wake Up',
    description: `It’s a Monday.\n6:30 AM.\nAn alarm chirps from your phone.`
  },
  {
    title: 'Beep beep',
    description: `You come across the funniest meme on Reddit.`
  },
]

const seedDilemmas = () => Dilemma.bulkCreate(dilemmaData)

module.exports = seedDilemmas