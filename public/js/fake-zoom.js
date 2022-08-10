const fakeZoom = document.getElementById('fake-zoom')
const userVideo = document.getElementById('user-video')
const catVideo = document.getElementById('cat-video')

const mediaDevices = navigator.mediaDevices

if (userVideo) {
  let clicks = 0
  userVideo.parentElement.addEventListener('click', () => {
    clicks++
    const bg = userVideo.nextElementSibling
    if (clicks % 4 === 1) bg.style.backgroundimages = `url(/images/red-8bit-overlay.png)`
    else if (clicks % 4 === 2) bg.style.backgroundimages = `url(/images/green-8bit-overlay.png)`
    else if (clicks % 4 === 3) bg.style.backgroundimages = `url(/images/blue-8bit-overlay.png)`
    else bg.style.backgroundimages = `url(/images/gray-8bit-overlay.png)`
  })
}

async function connect() {
  let stream = null
  if (fakeZoom) {
    stream = await mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
    userVideo.srcObject = stream;
    userVideo.onloadedmetadata = () => {
      userVideo.play();
      catVideo.play()
    };

  }
}

connect()