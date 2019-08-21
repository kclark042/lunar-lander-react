const CANVAS_WIDTH = 500;

export function defaultSpaceship() {
  return {
    color: "red",
    width: 8,
    height: 22,
    position: {
      x: CANVAS_WIDTH / 2,
      y: 20
    },
    velocity: {
      x: 0,
      y: 0
    },
    thrust: {
      x: 0,
      y: 0
    },
    gravity: {
      x: 0,
      y: -0.1622
    },
    fuel: 20,
    fuelBurned: 0,
    angle: 100.5,
    engineOn: false,
    landed: false,
    MTV: 5.0, //max touch down velocity
    crashed: false
  };
}

export function drawSpaceship(spaceship, canvas) {
  const context = canvas.getContext("2d");
  context.save();

  context.beginPath();
  context.translate(spaceship.position.x, spaceship.position.y);
  context.rotate(spaceship.angle);
  context.rect(
    spaceship.width * -0.5,
    spaceship.height * -0.5,
    spaceship.width,
    spaceship.height
  );
  context.fillStyle = spaceship.color;
  context.fill();
  context.closePath();

  // Draw the flame if engine is on
  if (spaceship.engineOn) {
    context.beginPath();
    context.moveTo(spaceship.width * -0.5, spaceship.height * 0.5);
    context.lineTo(spaceship.width * 0.5, spaceship.height * 0.5);
    context.lineTo(0, spaceship.height * 0.5 + Math.random() * 10);
    context.lineTo(spaceship.width * -0.5, spaceship.height * 0.5);
    context.closePath();
    context.fillStyle = "orange";
    context.fill();
  }
  context.restore();
}

export function updateSpaceship(spaceship, canvas) {
  spaceship.position.x += -1 * spaceship.velocity.x;
  spaceship.position.y += spaceship.velocity.y;

  if (spaceship.engineOn) {
    if (spaceship.fuel <= 0) {
      spaceship.fuel = 0;
      spaceship.fuelBurned = 0;

      spaceship.thrust.x = Math.sin(spaceship.angle) * spaceship.fuelBurned;
      spaceship.thrust.y = Math.cos(spaceship.angle) * spaceship.fuelBurned;

      spaceship.velocity.x +=
        -1 * spaceship.thrust.x * Math.sin(spaceship.angle);
      spaceship.velocity.y +=
        -1 * spaceship.thrust.y * Math.cos(spaceship.angle);
    } else {
      spaceship.fuelBurned++;

      spaceship.thrust.x = Math.sin(spaceship.angle) * spaceship.fuelBurned;
      spaceship.thrust.y = Math.cos(spaceship.angle) * spaceship.fuelBurned;

      spaceship.fuel -= spaceship.fuelBurned;

      spaceship.velocity.x +=
        -1 * spaceship.thrust.x * Math.sin(spaceship.angle);
      spaceship.velocity.y +=
        -1 * spaceship.thrust.y * Math.cos(spaceship.angle);
    }
  }

  spaceship.velocity.y -= spaceship.gravity.y;
  spaceship.fuelBurned = 0;

  if (spaceship.position.y >= canvas.height - 50) {
    spaceship.landed = true;
    if (spaceship.velocity.y > spaceship.MTV) {
      spaceship.crashed = true;
    }
  }

  return spaceship;
}

export function toggleEngine(spaceship) {
  spaceship.engineOn = !spaceship.engineOn;
  return spaceship;
}

export function displayStatus(spaceship, canvas, context) {
  context.save();
  context.fillStyle = "grey";
  context.fillRect(STATUS_BOX_WIDTH, 0, canvas.width - STATUS_BOX_WIDTH, 60);
  context.fill();
  context.restore();

  context.save();
  const velocity = spaceship.velocity.y.toPrecision(4);
  context.fillStyle = "black";
  context.font = "bold 14px verdana";
  context.fillText(
    `Fuel Remaining: ${spaceship.fuel}`,
    STATUS_BOX_WIDTH + 20,
    30
  );
  context.fillText(`Velocity: ${velocity}`, STATUS_BOX_WIDTH + 20, 50);
  context.restore();
}

const STATUS_BOX_WIDTH = 300;
