const startButton = document.getElementById("startButton");
const introAudio = document.getElementById("introAudio");

startButton.addEventListener("click", () => {
  introAudio.play();

  // Esperar 3 segundos para mostrar el botón ¡BASTA!
  setTimeout(() => {
    showBastaButton();
  }, 3000);

  // Esperar 5 segundos para continuar a la siguiente parte si el usuario no ha hecho clic
  setTimeout(() => {
    // Aquí se podría avanzar automáticamente o pausar si no hay interacción
  }, 5000);
});

function showBastaButton() {
  const bastaBtn = document.createElement("button");
  bastaBtn.textContent = "¡BASTA!";
  bastaBtn.id = "bastaButton";
  document.body.appendChild(bastaBtn);

  bastaBtn.addEventListener("click", () => {
    // Aquí iría la lógica para abrir la cámara
    alert("Abrir cámara...");
  });
}
