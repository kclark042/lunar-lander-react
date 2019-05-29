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

export function updateSpaceship(spaceship) {
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

  return spaceship
}

export function toggleEngine(spaceship){
  spaceship.engineOn = !spaceship.engineOn
  return spaceship
}