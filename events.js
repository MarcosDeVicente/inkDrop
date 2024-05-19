// events.js

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("clearButton").addEventListener("click", function () {
    drops = [];
    needsRedraw = true; // Indicar que se necesita redibujar
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
});
