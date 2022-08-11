
const seedDilemmas = require('./dilemma-seeds')
const seedChoices = require('./choice-seeds')
const seedOutcomes = require('./outcome-seeds')
const seedChoiceOutcomes = require('./choice-outcome-seeds')
const sequelize = require('../config/connection')
const seedQuotes = require('./quote-seeds')

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true })
    console.log('\n** Database synced')
    await seedDilemmas()
    console.log(`\n** Dilemmas seeded`)
    await seedChoices()
    console.log(`\n** Choices seeded`)
    await seedOutcomes()
    console.log(`\n** Outcomes seeded`)
    await seedChoiceOutcomes()
    console.log(`\n** Choice-Outcomes seeded`)
    await seedQuotes()
    console.log(`\n** Quotes seeded`)
  } catch (error) {
    console.error(error)
  }
  process.exit(0)
}

seedAll()