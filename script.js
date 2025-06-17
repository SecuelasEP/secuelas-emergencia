const startButton = document.getElementById("startButton");
const alertSound = document.getElementById("alertSound");
const camera = document.getElementById("camera");
const canvas = document.getElementById("photoCanvas");
const textDisplay = document.getElementById("textDisplay");
const polaroidContainer = document.getElementById("polaroidContainer");

const frases = [
  "Respira, todo va a estar bien.",
  "Estás a salvo aquí y ahora.",
  "Tu mente puede descansar.",
];

const versiculos = [
  "Salmos 46:1 - Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.",
  "Filipenses 4:6 - No se inquieten por nada; más bien, en toda ocasión, presenten sus peticiones a Dios en oración.",
  "Isaías 41:10 - No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios.",
];

function esperar(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function iniciar() {
  alertSound.play();
  await esperar(5000);
  startButton.style.opacity = 1;
}

iniciar();

startButton.addEventListener("click", async () => {
  startButton.style.display = "none";
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
  camera.srcObject = stream;
  camera.style.display = "block";

  await esperar(3000);

  const context = canvas.getContext("2d");
  canvas.width = camera.videoWidth;
  canvas.height = camera.videoHeight;
  context.drawImage(camera, 0, 0, canvas.width, canvas.height);

  const imageData = canvas.toDataURL("image/png");
  const img = new Image();
  img.src = imageData;
  polaroidContainer.innerHTML = "";
  polaroidContainer.appendChild(img);

  camera.srcObject.getTracks().forEach(track => track.stop());
  camera.style.display = "none";

  await esperar(5000);
  polaroidContainer.innerHTML = "";

  const frase = frases[Math.floor(Math.random() * frases.length)];
  textDisplay.innerText = frase;
  textDisplay.style.opacity = 1;
  await esperar(7000);
  textDisplay.style.opacity = 0;

  await esperar(1000);
  const versiculo = versiculos[Math.floor(Math.random() * versiculos.length)];
  textDisplay.innerText = versiculo;
  textDisplay.style.opacity = 1;
});
