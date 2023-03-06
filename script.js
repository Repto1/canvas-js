document.addEventListener("DOMContentLoaded", () => {
  const screen = document.querySelector("#screen");
  const context = screen.getContext("2d");
  const brush = {
    active: false,
    moving: false,
    currentPosition: { x: 0, y: 0 },
    initialPosition: null,
  };

  screen.width = 1280;
  screen.height = 720;

  const drawLine = (line) => {
    context.beginPath();
    context.moveTo(line.initialPosition.x, line.initialPosition.y);
    context.lineTo(line.currentPosition.x, line.currentPosition.y);
    context.stroke();
  };

  screen.onmousedown = (event) => {
    brush.active = true;
  };
  screen.onmouseup = (event) => {
    brush.active = false;
  };

  screen.onmousemove = (event) => {
    brush.currentPosition.x = event.clientX;
    brush.currentPosition.y = event.clientY;
    brush.moving = true;
  };

  const loop = () => {
    if (brush.active && brush.moving && brush.initialPosition) {
      drawLine({
        currentPosition: brush.currentPosition,
        initialPosition: brush.initialPosition,
      });
      brush.moving = false;
    }
    brush.initialPosition = { ...brush.currentPosition };
    setTimeout(loop, 10);
  };

  loop();
});
