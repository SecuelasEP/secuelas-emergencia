
const bastaBtn = document.getElementById("bastaBtn");
const alertAudio = document.getElementById("alertAudio");
const cameraContainer = document.getElementById("cameraContainer");
const video = document.getElementById("video");
const captureBtn = document.getElementById("captureBtn");
const flipBtn = document.getElementById("flipBtn");
const canvas = document.getElementById("canvas");
const polaroid = document.getElementById("polaroid");
const phrase = document.getElementById("phrase");
const verse = document.getElementById("verse");

let stream;
let useFrontCamera = true;

const phrases = [
  "Respira, todo estará bien.",
  "Estás a salvo ahora.",
  "Suelta ese pensamiento."
];

const verses = [
  "Salmo 46:1 – Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones."
];

window.onload = () => {
  alertAudio.play();
  setTimeout(() => {
    bastaBtn.style.display = "inline-block";
  }, 3000); // Mostrar botón a los 3s
};

bastaBtn.addEventListener("click", async () => {
  bastaBtn.style.display = "none";
  cameraContainer.style.display = "flex";
  await startCamera();
});

flipBtn.addEventListener("click", () => {
  useFrontCamera = !useFrontCamera;
  startCamera();
});

captureBtn.addEventListener("click", () => {
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataURL = canvas.toDataURL("image/png");

  stopCamera();
  cameraContainer.style.display = "none";

  polaroid.src = dataURL;
  polaroid.style.opacity = 0;
  polaroid.style.display = "block";

  // Simula la aparición gris primero
  setTimeout(() => {
    polaroid.style.opacity = 1;
  }, 1000);

  // Luego de 5 segundos, se desvanece la foto
  setTimeout(() => {
    polaroid.style.opacity = 0;
  }, 6000);

  // Mostrar frase calmante
  setTimeout(() => {
    polaroid.style.display = "none";
    phrase.textContent = getRandom(phrases);
    phrase.style.opacity = 1;
  }, 6500);

  // Quitar frase y mostrar versículo
  setTimeout(() => {
    phrase.style.opacity = 0;
    setTimeout(() => {
      phrase.style.display = "none";
      verse.textContent = getRandom(verses);
      verse.style.opacity = 1;
    }, 1000);
  }, 10500);
});

async function startCamera() {
  if (stream) stream.getTracks().forEach(t => t.stop());

  stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: useFrontCamera ? "user" : "environment" },
    audio: false
  });

  video.srcObject = stream;
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
