const { Outcome } = require("../models")

const outcomeData = [
  {
    description: 'You slept 90 minutes!!!',
    time_change: -90,
    preparedness_change: -30,
    crisis_change: 20,
  },
  {
    description: 'You slept 15 minutes!',
    time_change: -15,
    preparedness_change: -5,
    crisis_change: 5,
  },
  {
    description: 'You got out of bed!',
    time_change: -5,
    preparedness_change: 5,
    crisis_change: 0,
  },
  {
    description: 'You stepped on a Lego!',
    time_change: -5,
    preparedness_change: 0,
    crisis_change: 5,
  },
  {
    description: 'You resisted temptation!',
    time_change: 0,
    preparedness_change: 0,
    crisis_change: 0,
  },
  {
    description: 'Good job! You did one thing on your phone, then set it down..',
    time_change: -5,
    preparedness_change: 0,
    crisis_change: 5
  },
  {
    description: 'Uh oh! You went down an internet rabbit hole',
    time_change: -25,
    preparedness_change: -10,
    crisis_change: 10
  },
]

const seedOutcomes = () => Outcome.bulkCreate(outcomeData)

module.exports = seedOutcomes