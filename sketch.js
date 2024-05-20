// sketch.js

// Variables globales
const maxDrops = 200;
let drops = [];
let pressStartTime;
let dropSize;
let isPressing = false;
let lastDropTime = 0;
let dropInterval = 15;
let mouseMovedSincePress = false;
let currentDropColor;
let needsRedraw = true;
let randomDropColor = true;
let backgroundColor = "#000000";

// Configuración inicial del canvas
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // Usar WebGL para mejorar el rendimiento gráfico
  background(backgroundColor);
  setInterval(drawCanvas, 16); // Redibujar a 60 FPS
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(backgroundColor);
}

// Ajustar las funciones de p5.js para WebGL
function adjustedMouseX() {
  return mouseX - width / 2;
}

function adjustedMouseY() {
  return mouseY - height / 2;
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
    let dropRadius = pressDuration / 15; // Ajustar aquí también para consistencia
    let drop = new Drop(
      adjustedMouseX(),
      adjustedMouseY(),
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
    createDrop(adjustedMouseX(), adjustedMouseY(), currentDropColor);
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
    dropSize = pressDuration / 15; // Ajustar el factor de división para crecimiento más lento
    fill(100, 100, 255, 100);
    ellipse(adjustedMouseX(), adjustedMouseY(), dropSize * 2);
  }
}

// Crear una nueva gota
function createDrop(x, y, col) {
  let pressDuration = millis() - pressStartTime;
  let dropRadius = pressDuration / 15; // Ajustar aquí también para consistencia
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
