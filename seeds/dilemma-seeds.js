const { Dilemma } = require('../models')

const dilemmaData = [
  // bedroom dialogue
  {
    title: '7:00 AM',
    description: 'You have 180 minutes before your class starts',
    location: 'bedroom',
    initial: true
  },
  {
    title: 'Beep beep',
    description: `You come across the funniest meme on Reddit.`,
    location: 'bedroom'
<<<<<<< HEAD
  },
  {
    title: '7:00 AM',
    description: 'You have 180 minutes before your class starts',
    location: 'bedroom'
=======
    // triggered after # 1
>>>>>>> 1b2581c1db8d951c793141d937d8aa6c44b988f7
  },
  {
    title: 'Time is fickle, tricky, mistress.',
    description: 'Your life is like that tacky hour glass on your nightstand, except worse, the hour glass can reset, inconsequentially, with no evidence of its previous bearings.',
    location: 'bedroom'
<<<<<<< HEAD

=======
    // triggered after # 2
>>>>>>> 1b2581c1db8d951c793141d937d8aa6c44b988f7
  },
  {
    title: 'So arise to meet the day.',
    description: 'Or go back to sleep. Does it really matter anymore?',
<<<<<<< HEAD
    location: 'bedroom'
=======
    location: 'office'
>>>>>>> 1b2581c1db8d951c793141d937d8aa6c44b988f7
    //  potential for automatic game over, if you choose to go back asleep
  },

  // Choices for dilemma id 1.
  // I think we should have the choices for the cell phone always attached at the end of these prompts.

  // bathroom dialogue 
  {
    title: "The bathroom could use a good cleaning at some point.",
    description: 'Is it this weekend that your Mom is visiting?',
    location: 'bathroom'
<<<<<<< HEAD
=======
    // triggered on bathroom enter
>>>>>>> 1b2581c1db8d951c793141d937d8aa6c44b988f7
  },

  {
    title: 'You do might have time to take a shower, at the very least lets get those teeth brushed.',
<<<<<<< HEAD
    description: "Like your father said: 'Routine is important, listlessness is for losers and dope fiends'",
    location: 'bathroom'
=======
    description: "Like your father said: 'Routine is important, listlessness is for losers and dope fiends'"
    // triggered after previous
>>>>>>> 1b2581c1db8d951c793141d937d8aa6c44b988f7
  },

  // kitchen dialogue  
  {
    title: "I need coffee if I'm going to get through my class today.",
<<<<<<< HEAD
    description: 'Or maybe you should just get back in bed and cry? How long has it been since you last got laid?',
    location: 'kitchen'
  },
  {
    title: "or maybe I should take my prozac. I certainly couldn't do both.",
    description: 'Your driving yourself further from yourself, hiding behind a cloud of Serotonin.',
    location: 'kitchen'
=======
    description: 'Or maybe you should just get back in bed and cry? How long has it been since you last got laid?'
    // triggered by the stove
  },
  {
    title: "or maybe I should take my prozac. I certainly couldn't do both.",
    description: 'Your driving yourself further from yourself, hiding behind a cloud of Serotonin.'
    // triggered ???
>>>>>>> 1b2581c1db8d951c793141d937d8aa6c44b988f7
  },
  // office dialogue 
  {
    title: 'Before starting class...',
    description: 'You have time to do one last thing.'
<<<<<<< HEAD
    location: 'office'

=======
    // triggered on office enter
>>>>>>> 1b2581c1db8d951c793141d937d8aa6c44b988f7
  },
  {
    title: 'Choose carefully...',
    description: 'The implications could be life changing.'
    location: 'office'
  }
  // Maybe a dilemma menu with two randomly generated ids along with a proceed with class option.  

]

const seedDilemmas = () => Dilemma.bulkCreate(dilemmaData)

module.exports = seedDilemmas