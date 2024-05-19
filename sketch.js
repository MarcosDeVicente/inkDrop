let drops = [];
let pressStartTime;
let dropSize;
let isPressing = false;
let lastDropTime = 0; // Inicializar en 0 para el primer frame
const maxDrops = 250; // Máximo número de gotas
let dropInterval = 0; // Intervalo mínimo entre gotas en milisegundos, ajustable
let mouseMovedSincePress = false; // Variable para verificar si el mouse se ha movido desde que se presionó
let currentDropColor; // Variable para almacenar el color de las gotas mientras se arrastra
let needsRedraw = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  dropSize = 10000; // Tamaño inicial de la gota
  requestAnimationFrame(drawCanvas); // Iniciar el bucle de animación
}

function mousePressed(e) {
  pressStartTime = millis(); // Registrar el tiempo en que se empieza a presionar el mouse
  isPressing = true; // Indicar que se está presionando el mouse
  mouseMovedSincePress = false; // Resetear la variable de movimiento del mouse
  currentDropColor = color(random(255), random(255), random(255)); // Generar un nuevo color para la serie de gotas
  needsRedraw = true; // Indicar que se necesita redibujar
}

function mouseReleased(e) {
  if (!mouseMovedSincePress) {
    let pressDuration = millis() - pressStartTime; // Calcular la duración de la presión
    let dropRadius = pressDuration / 10; // Ajustar el tamaño de la gota basado en la duración

    let drop = new Drop(
      mouseX,
      mouseY,
      dropRadius,
      color(random(255), random(255), random(255))
    ); // Usar un color aleatorio
    for (let other of drops) {
      other.marble(drop);
    }

    // Añadir la nueva gota a la lista de gotas
    drops.push(drop);

    // Limitar el número de gotas
    if (drops.length > maxDrops) {
      drops.shift(); // Eliminar la gota más antigua
    }
    needsRedraw = true; // Indicar que se necesita redibujar
  }
  isPressing = false; // Indicar que se dejó de presionar el mouse
}

function mouseDragged(e) {
  if (isPressing && millis() - lastDropTime > dropInterval) {
    createDrop(mouseX, mouseY, currentDropColor); // Pasar el color actual
    lastDropTime = millis(); // Actualizar el tiempo de la última gota
    mouseMovedSincePress = true; // Indicar que el mouse se ha movido
    needsRedraw = true; // Indicar que se necesita redibujar
  }
}

function drawCanvas() {
  if (needsRedraw) {
    background(0);
    noStroke();
    // Dibujar las gotas existentes
    for (let drop of drops) {
      drop.show();
    }
    needsRedraw = false; // Resetear la necesidad de redibujar
  }

  // Mostrar el tamaño de la gota mientras se presiona el mouse
  if (isPressing) {
    let pressDuration = millis() - pressStartTime;
    dropSize = pressDuration / 10; // Ajustar la tasa de crecimiento del tamaño

    fill(100, 100, 255, 100); // Color de la gota en tiempo real
    ellipse(mouseX, mouseY, dropSize * 2); // Dibujar la gota en el cursor
  }
  requestAnimationFrame(drawCanvas); // Solicitar el siguiente cuadro de animación
}

function createDrop(x, y, col) {
  let pressDuration = millis() - pressStartTime; // Calcular la duración de la presión
  let dropRadius = pressDuration / 10; // Ajustar el tamaño de la gota basado en la duración

  let drop = new Drop(x, y, dropRadius, col); // Usar el color pasado como parámetro
  for (let other of drops) {
    other.marble(drop);
  }

  // Añadir la nueva gota a la lista de gotas
  drops.push(drop);

  // Limitar el número de gotas
  if (drops.length > maxDrops) {
    drops.shift(); // Eliminar la gota más antigua
  }
  needsRedraw = true; // Indicar que se necesita redibujar
}
