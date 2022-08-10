const { Outcome } = require("../models")

const outcomeData = [
  // triggers in bedroom, tied to dilemmas 
  {
    description: 'You slept 60 minutes!!!',
    time_change: -60,
    preparedness_change: -30,
    crisis_change: 50,
  },
  {
    description: 'You slept 15 minutes!',
    time_change: -15,
    preparedness_change: -5,
    crisis_change: -15,
  },
  {
    description: 'You got out of bed!',
    time_change: -5,
    preparedness_change: 5,
    crisis_change: 0,
  },
  // triggers in bathroom, tied to dilemmas 
  {
    description: 'You brushed your teeth till they are slightly less yellowed!',
    time_change: -30,
    preparedness_change: 25,
    crisis_change: 0
  },
  {
    description: "While brushing your teeth you catch a glance of yourself, you don't like what you see.",
    time_change: -30,
    preparedness_change: 25,
    crisis_change: 15
  },
  {
    description: 'You find yourself not being able to stop brushing your teeth, blood fills your mouth and tears stream down your face.',
    time_change: -30,
    preparedness_change: -25,
    crisis_change: 30
  }, {
    description: "You hop in the shower, you become lost in pleasant memories.",
    time_change: -100,
    preparedness_change: 75,
    crisis_change: -50
  },

  // triggers in kitchen, but tied to dilemmas 
  {
    description: 'You made a damn good cup of coffee',
    time_change: -30,
    preparedness_change: 25,
    crisis_change: 100
  },
  {
    description: 'Something tastes off about the coffee, you pass out and die.',
    time_change: -180,
    preparedness_change: -100,
    crisis_change: 100
  },
  {
    description: 'You take the prozac, you move further away from self-actualization, but at least your somewhat content.',
    time_change: -30,
    preparedness_change: 50,
    crisis_change: 25
  },

  // triggers in kitchen upon entrance 
  {
    description: 'Fresh coffee is waiting in your automatic coffee maker.',
    time_change: 10,
    preparedness_change: 25,
    crisis_change: -15
  },
  {
    description: 'You forgot to to set the automatic coffee maker the night prior; there is no coffee waiting to greet you.',
    time_change: -10,
    preparedness_change: -25,
    crisis_change: 20
  },
  // triggers randomly anywhere 
  {
    description: 'Your shoes are untied, and you trip!',
    time_change: -10,
    preparedness_change: -15,
    crisis_change: 15
  },
  {
    description: 'It appears a dog tore up your shoes the night prior. You do not own a dog.',
    time_change: -15,
    preparedness_change: -20,
    crisis_change: 20
  },
  {
    description: 'The smell of fresh cut grass coming through the window reminds you of your alcoholic father.',
    time_change: 0,
    preparedness_change: 0,
    crisis_change: 20
  },
  {
    description: 'You slipped on some lubricant spillage from the night prior.',
    time_change: -10,
    preparedness_change: -15,
    crisis_change: 20
  },
  {
    description: "You glance down at your phone: Your girlfriend says 'love you babe! :)'",
    time_change: -5,
    preparedness_change: 0,
    crisis_change: -20
  },
  {
    description: "You glance down at your phone: Your favorite pop artist died in what is being described as a 'drive by fruiting.'",
    time_change: -5,
    preparedness_change: 0,
    crisis_change: 30
  },
  {
    description: "You glance down at your phone: Your girlfriend says 'we need to talk.'",
    time_change: -5,
    preparedness_change: 0,
    crisis_change: 50
  },
  {
    description: "You glance down at your phone: Your Mom says 'have a great day sweetheart!'",
    time_change: -5,
    preparedness_change: 5,
    crisis_change: -20
  },
  {
    description: "You glance down at your phone: Russia has launched an ICBM directly at your city.",
    time_change: -5,
    preparedness_change: -100,
    crisis_change: 100,
  },
  {
    description: "You spot a large cockroach.",
    time_change: 0,
    preparedness_change: -10,
    crisis_change: 20
  },
  {
    description: "You glance up at the wall and notice a portrait your ex did of you before she left you for that art school hipster.",
    time_change: -5,
    preparedness_change: 0,
    crisis_change: 10
  },
  {
    description: "You stubbed your toe on a candelabra!",
    time_change: -5,
    preparedness_change: -10,
    crisis_change: 15
  },
  {
    description: 'The disembodied spirit of Franz Kafka slaps you across the face, you inch closer to self-actualization.',
    time_change: -5,
    preparedness_change: 20,
    crisis_change: -50
  },
  {
    description: 'You hear a distinctive grunt coming from the corner, you proceed to puke all over the place.',
    time_change: -20,
    preparedness_change: -20,
    crisis_change: 50
  },
  {
    description: 'You stepped on a Lego!',
    time_change: -5,
    preparedness_change: 0,
    crisis_change: 15,
  },
  {
    description: 'You resisted temptation!',
    time_change: 0,
    preparedness_change: 10,
    crisis_change: 0,
  },

]

const seedOutcomes = () => Outcome.bulkCreate(outcomeData)

module.exports = seedOutcomes