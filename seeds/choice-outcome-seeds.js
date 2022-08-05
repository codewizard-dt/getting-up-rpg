const { ChoiceOutcome } = require("../models")

const choiceOutcomeData = [
  {
    choice_id: 1,
    outcome_id: 1,
    likelihood: 8
  },
  {
    choice_id: 1,
    outcome_id: 2,
    likelihood: 1
  },
  {
    choice_id: 2,
    outcome_id: 3,
    likelihood: 3
  },
  {
    choice_id: 2,
    outcome_id: 4,
    likelihood: 1
  },
  {
    choice_id: 3,
    outcome_id: 2,
    likelihood: 6
  },
  {
    choice_id: 3,
    outcome_id: 1,
    likelihood: 1
  },
  {
    choice_id: 4,
    outcome_id: 5,
    likelihood: 1
  },
  {
    choice_id: 5,
    outcome_id: 6,
    likelihood: 3
  },
  {
    choice_id: 5,
    outcome_id: 7,
    likelihood: 1
  },

]

const seedChoiceOutcomes = () => ChoiceOutcome.bulkCreate(choiceOutcomeData)

module.exports = seedChoiceOutcomes