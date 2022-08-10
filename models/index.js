const Dilemma = require('./Dilemma')
const Choice = require('./Choice')
const Outcome = require('./Outcome')
const ChoiceOutcome = require('./ChoiceOutcome')
const Quote = require('./Quote')

Dilemma.hasMany(Choice)
Choice.belongsTo(Dilemma)

Choice.belongsToMany(Outcome, {
  through: ChoiceOutcome,
  onDelete: 'SET NULL',
})
Outcome.belongsToMany(Choice, {
  through: ChoiceOutcome,
  onDelete: 'SET NULL'
})

module.exports = {
  Dilemma, Choice, Outcome, ChoiceOutcome, Quote
}