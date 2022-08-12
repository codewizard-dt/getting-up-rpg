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