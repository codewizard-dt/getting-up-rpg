async function handleChoice(ev) {
  const { target } = ev;
  const id = $(target).attr('id')
  console.log(id)
  const result = await fetch(`/api/choices/${id}/random-outcome`)
  const outcome = await result.json()
  console.log(outcome)
}

$('.choice-btn').on('click', handleChoice)
// $('#game-play').attr('src','/bathroom.html')