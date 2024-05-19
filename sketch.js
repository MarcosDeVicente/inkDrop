// sketch.js

// Variables globales
let drops = [];
let pressStartTime;
let dropSize;
let isPressing = false;
let lastDropTime = 0;
const maxDrops = 250;
let dropInterval = 0;
let mouseMovedSincePress = false;
let currentDropColor;
let needsRedraw = true;
let randomDropColor = true;
let backgroundColor = "#000000";

// Configuración inicial del canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(backgroundColor);
  dropSize = 10000;
  setInterval(drawCanvas, 16); // Redibujar a 60 FPS
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(backgroundColor);
}

// Manejar la presión del mouse
function mousePressed() {
  pressStartTime = millis();
  isPressing = true;
  mouseMovedSincePress = false;
  currentDropColor = randomDropColor
    ? color(random(255), random(255), random(255))
    : currentDropColor;
  needsRedraw = true;
}

// Manejar la liberación del mouse
function mouseReleased() {
  if (!mouseMovedSincePress) {
    let pressDuration = millis() - pressStartTime;
    let dropRadius = pressDuration / 10;
    let drop = new Drop(
      mouseX,
      mouseY,
      dropRadius,
      randomDropColor
        ? color(random(255), random(255), random(255))
        : currentDropColor
    );
    drops.forEach((other) => other.marble(drop));
    drops.push(drop);
    if (drops.length > maxDrops) drops.shift();
    needsRedraw = true;
  }
  isPressing = false;
}

// Manejar el arrastre del mouse
function mouseDragged() {
  if (isPressing && millis() - lastDropTime > dropInterval) {
    createDrop(mouseX, mouseY, currentDropColor);
    lastDropTime = millis();
    mouseMovedSincePress = true;
    needsRedraw = true;
  }
}

// Redibujar el canvas
function drawCanvas() {
  if (needsRedraw) {
    background(backgroundColor);
    noStroke();
    drops.forEach((drop) => drop.show());
    needsRedraw = false;
  }
  if (isPressing) {
    let pressDuration = millis() - pressStartTime;
    dropSize = pressDuration / 10;
    fill(100, 100, 255, 100);
    ellipse(mouseX, mouseY, dropSize * 2);
  }
}

// Crear una nueva gota
function createDrop(x, y, col) {
  let pressDuration = millis() - pressStartTime;
  let dropRadius = pressDuration / 10;
  let drop = new Drop(x, y, dropRadius, col);
  drops.forEach((other) => other.marble(drop));
  drops.push(drop);
  if (drops.length > maxDrops) drops.shift();
  needsRedraw = true;
}

// Actualizar el color de fondo
function setBackground(colorValue) {
  backgroundColor = colorValue;
  needsRedraw = true;
}

// Actualizar el color de la gota
function setDropColor(colorValue) {
  currentDropColor = color(colorValue);
}

// Alternar el color aleatorio de la gota
function toggleRandomDropColor(isRandom) {
  randomDropColor = isRandom;
}
