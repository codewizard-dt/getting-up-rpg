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
  const nextRoom = roomMap[room]
  const leftNavBtn = $('button.left-nav')
  const rightNavBtn = $('button.right-nav')
  $(map).removeClass('bedroom bathroom kitchen office').addClass(room).data({ room })

  leftNavBtn.data({ room: nextRoom.toLeft }).text(nextRoom.toLeft)
  rightNavBtn.data({ room: nextRoom.toRight }).text(nextRoom.toRight)

}

function navClick(ev) {
  const direction = $(this).hasClass('left-nav') ? 'left' : 'right'
  const room = $(this).data('room')
  console.log(direction, room)
  navigate(direction, room)
}
$('button.nav').on('click', navClick)

//start in the middle of the map
var x = 90;
var y = 34;
var held_directions = []; //State of which arrow keys we are holding down
var speed = 1; //How fast the character moves in pixels per frame

const placeCharacter = () => {

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
  next: (x, y) => {
    const nextStr = `${x}-${y}`
    if (nextStr !== positionTracker.current) chance(x, y)
    positionTracker.current = nextStr
  },
  atLeftWall: false,
  atRightWall: false,
  atTopWall: false,
  atBottomWall: false
}

const chance = (x, y) => {
  console.log({ x, y })
  const currentRoom = $(map).data('room')
  if (Math.floor(Math.random() * 1000) < 5) console.log(currentRoom, x, y)
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

if (map) {
  document.addEventListener("keydown", (e) => {
    var dir = keys[e.which];
    if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir)
    }
  })

  document.addEventListener("keyup", (e) => {
    var dir = keys[e.which];
    var index = held_directions.indexOf(dir);
    if (index > -1) {
      held_directions.splice(index, 1)
    }
  });

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
    console.log('mouse is down')
    isPressed = true;
  })
  document.body.addEventListener("mouseup", () => {
    console.log('mouse is up')
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
