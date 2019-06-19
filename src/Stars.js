export function createStars(canvas) {
  const stars = [];
  for (var i = 0; i < 500; i++) {
    stars[i] = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.sqrt(Math.random() * 2),
      alpha: 1.0,
      decreasing: true,
      dRatio: Math.random() * 0.009
    };
  }
  return stars;
}

export function drawStars(stars, canvas, context) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();
  context.fillStyle = "#111";
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < stars.length; i++) {
    let star = stars[i];
    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = "rgba(255, 255, 255, " + star.alpha + ")";
    star = updateStar(star);
    context.fill();
    stars[i] = star;
  }
  context.restore();
}

export function updateStar(star) {
  if (star.decreasing) {
    star.alpha -= star.dRatio;
    if (star.alpha < 0.1) {
      star.decreasing = false;
    }
  } else {
    star.alpha += star.dRatio;
    if (star.alpha > 0.95) {
      star.decreasing = true;
    }
  }
  return star;
}
