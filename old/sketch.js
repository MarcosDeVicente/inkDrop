let drops = [];
let pressStartTime;
let dropSize;
let isPressing = false;
const maxDrops = 200; // Máximo número de gotas

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  dropSize = 10000; // Tamaño inicial de la gota
}

function mousePressed(e) {
  pressStartTime = millis(); // Registrar el tiempo en que se empieza a presionar el mouse
  isPressing = true; // Indicar que se está presionando el mouse
}

function mouseReleased(e) {
  let pressDuration = millis() - pressStartTime; // Calcular la duración de la presión
  let dropRadius = pressDuration / 10; // Ajustar el tamaño de la gota basado en la duración

  let drop = new Drop(mouseX, mouseY, dropRadius);
  for (let other of drops) {
    other.marble(drop);
  }

  // Añadir la nueva gota a la lista de gotas
  drops.push(drop);

  // Limitar el número de gotas
  if (drops.length > maxDrops) {
    drops.shift(); // Eliminar la gota más antigua
  }

  isPressing = false; // Indicar que se dejó de presionar el mouse
}

function draw() {
  background(0);
  noStroke();

  // Dibujar las gotas existentes
  for (let drop of drops) {
    drop.show();
  }

  // Mostrar el tamaño de la gota mientras se presiona el mouse
  if (isPressing) {
    let pressDuration = millis() - pressStartTime;
    dropSize = pressDuration / 10; // Ajustar la tasa de crecimiento del tamaño

    fill(100, 100, 255, 100); // Color de la gota en tiempo real
    ellipse(mouseX, mouseY, dropSize * 2); // Dibujar la gota en el cursor
  }
}
