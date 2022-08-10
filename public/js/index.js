$('#player-name').on('submit', async (ev) => {
  ev.preventDefault()
  const user_name = $('#player-name-input').val()
  $('.user_name').text(user_name)
  const result = await fetch('/api/user/name', {
    method: 'POST',
    body: JSON.stringify({ user_name })
  })
  if (result.ok) {
    $('#player-name').hide()
    $('#StartGame').fadeIn()
  }
})

// async function handleChoice(ev) {
//   const { target } = ev;
//   const id = $(target).attr('id')

//   const result = await fetch(`/api/choices/${id}/random-outcome`)
//   const outcome = await result.json()

//   handleOutcome(outcome)
// }

// const dialogHeader = $('#dialog-box').find('h2')
// const dialogText = $('#dialog-box').find('p')
// const statBox = $('#stat-box')
// function handleOutcome(outcome) {
//   console.log(outcome)
//   const { currentState: { crisis_level, preparedness, time_left }, randomOutcome: { description, time_change, crisis_change, preparedness_change } } = outcome
//   dialogHeader.html(description)
//   dialogText.html(`Time change: ${time_change}<br>Crisis change: ${crisis_change}<br>Preparedness change: ${preparedness_change}`)
//   statBox.html(`Crisis Level: ${crisis_level}<br>Preparedness: ${preparedness}%<br>Time left: ${time_left} minutes`)
// }


