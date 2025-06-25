const alertAudio = document.getElementById("alertAudio");
const startScreen = document.getElementById("startScreen");
const playIcon = document.getElementById("playIcon");
const bastaBtn = document.getElementById("bastaBtn");
const cameraContainer = document.getElementById("cameraContainer");
const video = document.getElementById("video");
const captureBtn = document.getElementById("captureBtn");
const flipBtn = document.getElementById("flipBtn");
const canvas = document.getElementById("canvas");
const polaroid = document.getElementById("polaroid");
const polaroidContainer = document.getElementById("polaroidContainer");
const disintegrateEffect = document.getElementById("disintegrateEffect");
const phrase = document.getElementById("phrase");
const verse = document.getElementById("verse");

let stream, useFront = false;

const phrases = [
  "Respira, todo estará bien.",
  "Estás a salvo ahora.",
  "Suelta ese pensamiento."
];

const verses = [
  "Salmo 46:1 – Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones."
];

playIcon.onclick = () => {
  startScreen.style.display = "none";
  alertAudio.play();
  setTimeout(() => {
    bastaBtn.style.display = "inline-block";
  }, 3000);
};

bastaBtn.onclick = async () => {
  bastaBtn.style.display = "none";
  cameraContainer.style.display = "flex";
  await startCamera();
};

flipBtn.onclick = () => {
  useFront = !useFront;
  startCamera();
};

captureBtn.onclick = () => {
  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);
  stopCamera();
  cameraContainer.style.display = "none";

  polaroid.src = canvas.toDataURL();
  polaroidContainer.style.display = "flex";
  polaroid.style.opacity = 1;

  setTimeout(() => {
    disintegrateEffect.style.opacity = 1;
    polaroid.classList.add("disappear");
    disintegrateEffect.classList.add("disappear");
  }, 5000);

  setTimeout(() => {
    polaroidContainer.style.display = "none";
    phrase.textContent = phrases[Math.floor(Math.random() * phrases.length)];
    phrase.style.opacity = 1;
  }, 7000);

  setTimeout(() => {
    phrase.style.opacity = 0;
    setTimeout(() => {
      verse.textContent = verses[0];
      verse.style.opacity = 1;
    }, 1000);
  }, 11000);
};

async function startCamera() {
  if (stream) stream.getTracks().forEach(t => t.stop());
  stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: useFront ? "user" : "environment" },
    audio: false
  });
  video.srcObject = stream;
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
  }
}
