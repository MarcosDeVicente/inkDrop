document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("clearButton").addEventListener("click", function () {
    drops = [];
    needsRedraw = true;
  });

  document
    .getElementById("downloadButton")
    .addEventListener("click", function () {
      saveCanvas("marbling_art", "jpg");
    });

  document
    .getElementById("backgroundButton")
    .addEventListener("click", function () {
      document.getElementById("backgroundColorPicker").click();
    });

  document.getElementById("dropButton").addEventListener("click", function () {
    document.getElementById("dropColorPicker").click();
  });

  document
    .getElementById("randomButton")
    .addEventListener("click", function () {
      let checkbox = document.getElementById("randomDropColor");
      checkbox.checked = !checkbox.checked;
      toggleRandomDropColor(checkbox.checked);
    });

  document
    .getElementById("backgroundColorPicker")
    .addEventListener("input", function (event) {
      setBackground(event.target.value);
    });

  document
    .getElementById("dropColorPicker")
    .addEventListener("input", function (event) {
      setDropColor(event.target.value);
    });

  // Manejadores de eventos de touch
  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchend", handleTouchEnd, false);
  document.addEventListener("touchmove", handleTouchMove, false);
});

function handleTouchStart(event) {
  if (event.targetTouches.length == 1) {
    let touch = event.targetTouches[0];
    mouseX = touch.pageX;
    mouseY = touch.pageY;
    mousePressed();
  }
}

function handleTouchEnd(event) {
  mouseReleased();
}

function handleTouchMove(event) {
  if (event.targetTouches.length == 1) {
    let touch = event.targetTouches[0];
    mouseX = touch.pageX;
    mouseY = touch.pageY;
    mouseDragged();
  }
}
