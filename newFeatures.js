// seguimiento de la gota
function drawCanvas() {
  if (needsRedraw) {
    background(0);
    noStroke();
    // Dibujar solo las gotas más recientes o afectadas
    for (let i = Math.max(0, drops.length - 10); i < drops.length; i++) {
      drops[i].show();
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
}
