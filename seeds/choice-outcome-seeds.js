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
    choice_id: 3,
    outcome_id: 1,
    likelihood: 1
  },
  {
    choice_id: 3,
    outcome_id: 2,
    likelihood: 8
  },
  { choice_id: 4,
    outcome_id: 28,
    likelihood: 1
  },
  { choice_id: 5,
    outcome_id: 24,
    likelihood: 5
  },
  {choice_id: 6,
   outcome_id: 27,
   likelihood: 5
  },
  {choice_id: 7,
   outcome_id: 4,
   likelihood: 6
  },
  {choice_id: 7,
   outcome_id: 5,
   likelihood: 4
  },
  {choice_id: 7,
   outcome_id: 6,
   likelihood: 2
  },
  {choice_id: 8,
   outcome_id: 7,
   likelihood: 1
  },
  {choice_id: 9,
   outcome_id: 14,
   likelihood: 1
  },
  {choice_id: 10,
   outcome_id: 12,
   likelihood: 4
  },
  {choice_id: 10,
   choice_id: 11,
   likelihood: 6
  },
  {choice_id: 10,
   outcome_id: 9,
   likelihood: 1
  },
  {choice_id: 10,
   outcome_id: 8,
   likelihood: 4
  },
  {choice_id: 11,
   outcome_id: 10,
   likelihood: 1
  },
  {choice_id: 12,
   outcome_id: 16,
   likelihood: 1
  },
  {choice_id: 13,
   outcome_id: 17,
   likelihood: 1
  },
  {choice_id: 14,
   outcome_id:20,
   likelihood: 1
  },
  {choice_id: 15,
   outcome_id: 21,
   likelihood: 1,
  }

  
]

const seedChoiceOutcomes = () => ChoiceOutcome.bulkCreate(choiceOutcomeData)

module.exports = seedChoiceOutcomes