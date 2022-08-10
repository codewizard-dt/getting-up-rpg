var character = document.querySelector(".character");
var map = document.querySelector(".map");

const roomMap = {
  office: {
    toLeft: null,
    toRight: 'kitchen'
  },
  kitchen: {
    toLeft: 'office',
    toRight: 'bedroom'
  },
  bedroom: {
    toLeft: 'kitchen',
    toRight: 'bathroom',
    initial: { x: 90, y: 34 }
  },
  bathroom: {
    toLeft: 'bedroom',
    toRight: null,
    initial: { x: 10, y: 50 }
  },
}

function navigate(direction, room) {
  if (dilemmas.gamePaused) return;
  const nextRoom = roomMap[room]
  const leftNavBtn = $('button.left-nav')
  const rightNavBtn = $('button.right-nav')
  $(map).removeClass('bedroom bathroom kitchen office').addClass(room).data({ room })
  dilemmas.currentRoom = room
  leftNavBtn.data({ room: nextRoom.toLeft }).text(nextRoom.toLeft)
  rightNavBtn.data({ room: nextRoom.toRight }).text(nextRoom.toRight)
  // if Bathroom
}

function navClick(ev) {
  const direction = $(this).hasClass('left-nav') ? 'left' : 'right'
  const room = $(this).data('room')
  console.log(direction, room)
  navigate(direction, room)
}
$('button.nav').on('click', navClick)

const elements = {
  dialogHeader: $('#dialog-box').find('h2'),
  dialogText: $('#dialog-box').find('p'),
  statBox: $('#stat-box'),
  choiceBox: $('#choice-box'),
  crisisBar: $('#crisis'),
  timeEl: $('#time'),
  updateTime: () => {
    elements.timeEl.text(time.toLocaleString(luxon.DateTime.TIME_SIMPLE))
  },
  cameraEl: $('.camera')
}

const dilemmas = {
  list: [],
  pause: () => {
    dilemmas.gamePaused = true
    elements.cameraEl.addClass('paused')
  },
  unpause: () => {
    dilemmas.gamePaused = false
    elements.cameraEl.removeClass('paused')
  },
  gamePaused: false,
  fetchAll: async () => {
    const result = await fetch('/api/dilemmas').then(result => result.json())
    dilemmas.list = result;
    dilemmas.roomList = dilemmas.findByRoom('bedroom')
    console.log(dilemmas.list, dilemmas.roomList)
  },
  currentRoom: 'bedroom',
  roomList: function () { return dilemmas.findByRoom(dilemmas.currentRoom) },
  findByRoom: (roomName) => {
    return dilemmas.list.filter(({ location }) => location === roomName)
  },
  handleDilemma: (dilemma_id) => {
    const dilemma = dilemmas.list.find(({ id }) => dilemma_id == id)
    if (!dilemma) return
    stopMove()
    dilemmas.pause()
    dilemmas.list.splice(dilemmas.list.indexOf(dilemma), 1)
    console.log("*\n*\nNEW DILEMMA", dilemma, `${dilemmas.list.length} left`)
    elements.dialogHeader.html(dilemma.title)
    elements.dialogText.html(dilemma.description)
    elements.choiceBox.html('')
    for (let choice of dilemma.choices) {
      elements.choiceBox.append(`<button class="choice-btn" id="${choice.id}">${choice.description}</button>`)
    }
    if (dilemma.choices.length === 0) {
      elements.choiceBox.append(`<button class="choice-btn">Continue... I suppose...</button>`)
    }
  },
  handleChoice: async (ev) => {
    const { target } = ev;
    const id = $(target).attr('id')
    if (id) {
      const result = await fetch(`/api/choices/${id}/random-outcome`)
      const outcome = await result.json()
      dilemmas.handleOutcome(outcome)
    } else {
      elements.choiceBox.html('')

    }
    dilemmas.unpause()
  },
  handleOutcome: (outcome) => {
    console.log(outcome)
    const { currentState: { crisis_level, preparedness, time_left }, randomOutcome: { description, time_change, crisis_change, preparedness_change } } = outcome
    elements.choiceBox.html(`<h2>${description}</h2><p>Crisis level +${crisis_change}%<br>Preparedness +${preparedness_change}%<br>Minutes wasted ${Math.abs(time_change)}</p>`)
    elements.dialogHeader.html('')
    elements.dialogText.html(``)
    elements.statBox.html(`Crisis Level: ${crisis_level} <br>Preparedness: ${preparedness}%<br>Time left: ${time_left} minutes`)
    elements.crisisBar.val(crisis_level)
    time = time.minus({ minutes: time_change })
    elements.updateTime()
  }

}

let time = luxon.DateTime.fromObject({ hour: 7 })
async function startGame() {
  $('#choice-box').on('click', '.choice-btn', dilemmas.handleChoice)
  elements.updateTime()
  await dilemmas.fetchAll()
  dilemmas.handleDilemma(1)
}
if (map) startGame()


//start in the middle of the map
var x = 90;
var y = 34;
var held_directions = []; //State of which arrow keys we are holding down
var speed = 1; //How fast the character moves in pixels per frame

const placeCharacter = () => {
  if (dilemmas.gamePaused) return
  var pixelSize = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
  );

  const held_direction = held_directions[0];
  if (held_direction) {
    if (held_direction === directions.right) { x += speed; }
    if (held_direction === directions.left) { x -= speed; }
    if (held_direction === directions.down) { y += speed; }
    if (held_direction === directions.up) { y -= speed; }
    character.setAttribute("facing", held_direction);
  }
  character.setAttribute("walking", held_direction ? "true" : "false");

  //Limits (gives the illusion of walls)
  var leftLimit = -8;
  var rightLimit = (16 * 11) + 8;
  var topLimit = -8 + 32;
  var bottomLimit = (16 * 7);

  const currentRoom = $(map).data('room')
  if (x < leftLimit) {
    x = leftLimit;
    const roomToLeft = roomMap[currentRoom].toLeft
    if (roomToLeft) {
      x = rightLimit
      navigate('left', roomToLeft)
    }
  }
  if (x > rightLimit) {
    x = rightLimit;
    const roomToRight = roomMap[currentRoom].toRight
    if (roomToRight) {
      x = leftLimit
      navigate('right', roomToRight)
    }
  }
  if (y < topLimit) { y = topLimit; }
  if (y > bottomLimit) { y = bottomLimit; }


  var camera_left = pixelSize * 66;
  var camera_top = pixelSize * 42;

  map.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${-y * pixelSize + camera_top}px, 0 )`;
  character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize}px, 0 )`

  positionTracker.next(x, y);
}

const positionTracker = {
  current: null,
  totalSteps: 0,
  stepsSinceDilemma: 0,
  next: (x, y) => {
    const nextStr = `${x}-${y}`
    if (nextStr !== positionTracker.current) {
      positionTracker.totalSteps++
      positionTracker.stepsSinceDilemma++
      if (positionTracker.stepsSinceDilemma % 150 === 0) {
        const roomDilemmas = dilemmas.findByRoom(dilemmas.currentRoom)
        if (roomDilemmas.length) dilemmas.handleDilemma(roomDilemmas[0].id)
      } else {
        chance(x, y)
      }

    }
    positionTracker.current = nextStr
  },
}

const chance = (x, y) => {
  const currentRoom = $(map).data('room')
  if (Math.floor(Math.random() * 1000) < 10) {
    const randomDilemmas = dilemmas.findByRoom('any')
    if (randomDilemmas.length) dilemmas.handleDilemma(randomDilemmas[0].id)
    // dilemmas.pause()
    console.log(currentRoom, x, y)
  }
}

//Set up the game loop
const step = () => {
  if (!map) return;
  // console.log('step')
  placeCharacter();
  window.requestAnimationFrame(() => {
    step();
  })
}
step(); //kick off the first step!



/* Direction key state */
const directions = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
}
const keys = {
  38: directions.up,
  37: directions.left,
  39: directions.right,
  40: directions.down,
}

function startMove(e) {
  if (dilemmas.gamePaused) return;
  console.log('start')
  var dir = keys[e.which];
  if (dir && held_directions.indexOf(dir) === -1) {
    held_directions.unshift(dir)
  }
}
function stopMove(e) {
  if (e) {
    var dir = keys[e.which];
    var index = held_directions.indexOf(dir);
    if (index > -1) {
      held_directions.splice(index, 1)
    }
  } else {
    held_directions = []
    $('.character').attr('walking', false)
  }
}
if (map) {
  document.addEventListener("keydown", startMove)
  document.addEventListener("keyup", stopMove);
}



/* Dpad functionality for mouse and touch */
var isPressed = false;
const removePressedAll = () => {
  document.querySelectorAll(".dpad-button").forEach(d => {
    d.classList.remove("pressed")
  })
}
if (map) {
  document.body.addEventListener("mousedown", () => {
    // console.log('mouse is down')
    isPressed = true;
  })
  document.body.addEventListener("mouseup", () => {
    // console.log('mouse is up')
    isPressed = false;
    held_directions = [];
    removePressedAll();
  })

}

const handleDpadPress = (direction, click) => {
  if (click) {
    isPressed = true;
  }
  held_directions = (isPressed) ? [direction] : []

  if (isPressed) {
    removePressedAll();
    document.querySelector(".dpad-" + direction).classList.add("pressed");
  }
}
//Bind a ton of events for the dpad
if (map) {
  document.querySelector(".dpad-left").addEventListener("touchstart", (e) => handleDpadPress(directions.left, true));
  document.querySelector(".dpad-up").addEventListener("touchstart", (e) => handleDpadPress(directions.up, true));
  document.querySelector(".dpad-right").addEventListener("touchstart", (e) => handleDpadPress(directions.right, true));
  document.querySelector(".dpad-down").addEventListener("touchstart", (e) => handleDpadPress(directions.down, true));

  document.querySelector(".dpad-left").addEventListener("mousedown", (e) => handleDpadPress(directions.left, true));
  document.querySelector(".dpad-up").addEventListener("mousedown", (e) => handleDpadPress(directions.up, true));
  document.querySelector(".dpad-right").addEventListener("mousedown", (e) => handleDpadPress(directions.right, true));
  document.querySelector(".dpad-down").addEventListener("mousedown", (e) => handleDpadPress(directions.down, true));

  document.querySelector(".dpad-left").addEventListener("mouseover", (e) => handleDpadPress(directions.left));
  document.querySelector(".dpad-up").addEventListener("mouseover", (e) => handleDpadPress(directions.up));
  document.querySelector(".dpad-right").addEventListener("mouseover", (e) => handleDpadPress(directions.right));
  document.querySelector(".dpad-down").addEventListener("mouseover", (e) => handleDpadPress(directions.down));
}
