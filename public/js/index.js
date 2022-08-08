async function handleChoice(ev) {
  const { target } = ev;
  const id = $(target).attr('id')

  const result = await fetch(`/api/choices/${id}/random-outcome`)
  const outcome = await result.json()

  handleOutcome(outcome)
}

function handleOutcome(outcome) {
  console.log(outcome)
  $('#dialog-box').find('h2').html(outcome.randomOutcome.description)
  $('#dialog-box').find('p').html(`Time change: ${outcome.randomOutcome.time_change}<br>Crisis change: ${outcome.randomOutcome.crisis_change}`)

}
$('.choice-btn').on('click', handleChoice)
// $('#game-play').attr('src','/bathroom.html')