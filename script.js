const playButton = document.getElementById("playButton");
const bastaButton = document.getElementById("bastaButton");
const alertAudio = document.getElementById("alertAudio");
const cameraSection = document.getElementById("cameraSection");
const video = document.getElementById("camera");
const flipButton = document.getElementById("flipButton");
const captureButton = document.getElementById("captureButton");
const canvas = document.getElementById("canvas");
const photoReveal = document.getElementById("photoReveal");
const message = document.getElementById("message");
const breathing = document.getElementById("breathing");
const finalScreen = document.getElementById("finalScreen");

let facingMode = "environment";

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

playButton.addEventListener("click", async () => {
  playButton.style.display = "none";
  alertAudio.play();
  // 2. A los 3s aparece ¡BASTA!
  await delay(3000);
  bastaButton.style.display = "block";
  // 1. Detener audio a los 5s
  setTimeout(() => alertAudio.pause(), 2000);
});

bastaButton.addEventListener("click", async () => {
  // 3. Abrir cámara
  bastaButton.style.display = "none";
  cameraSection.style.display = "block";
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
  video.srcObject = stream;
});

flipButton.addEventListener("click", async () => {
  facingMode = facingMode === "environment" ? "user" : "environment";
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
  video.srcObject = stream;
});

captureButton.addEventListener("click", async () => {
  // 4. Captura y revelado
  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);
  // detener cámara
  video.srcObject.getTracks().forEach(t => t.stop());
  cameraSection.style.display = "none";

  // asignar imagen al div
  const dataUrl = canvas.toDataURL();
  photoReveal.style.backgroundImage = `url(${dataUrl})`;
  photoReveal.style.display = "block";
  await delay(5000);
  photoReveal.classList.add("disintegrate");
  await delay(1000);
  photoReveal.style.display = "none";

  // 5. Frase aleatoria
  message.innerText = "A veces basta un instante para cambiarlo todo.";
  message.style.display = "block";
  await delay(4000);
  message.classList.add("disintegrate");
  await delay(1000);
  message.style.display = "none";
  message.classList.remove("disintegrate");

  // 6. Versículo
  message.innerText = "“El Señor es mi luz y mi salvación; ¿a quién temeré?” — Salmo 27:1";
  message.style.display = "block";
  await delay(4000);
  message.classList.add("disintegrate");
  await delay(1000);
  message.style.display = "none";
  message.classList.remove("disintegrate");

  // 7. Respiración (3 ciclos)
  breathing.style.display = "flex";
  for (let i = 0; i < 3; i++) {
    await delay(3000);
  }
  breathing.classList.add("disintegrate");
  await delay(1000);
  breathing.style.display = "none";
  breathing.classList.remove("disintegrate");

  // 8. Pantalla final
  // desin­tegra todo el container
  document.getElementById("container").classList.add("disintegrate");
  await delay(1000);
  document.getElementById("container").style.display = "none";
  finalScreen.style.display = "block";
});
