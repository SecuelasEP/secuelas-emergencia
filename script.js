const playButton = document.getElementById("playButton");
const bastaButton = document.getElementById("bastaButton");
const alertAudio = document.getElementById("alertAudio");
const camera = document.getElementById("camera");
const flipButton = document.getElementById("flipButton");
const captureButton = document.getElementById("captureButton");
const canvas = document.getElementById("canvas");
const photoReveal = document.getElementById("photoReveal");
const message = document.getElementById("message");
const breathing = document.getElementById("breathing");
const breathingText = document.getElementById("breathingText");
const finalScreen = document.getElementById("finalScreen");

let usingFrontCamera = false;
let currentStream = null;

const phrases = [
  { text: "Estás aquí, ahora.", verse: "Salmo 46:10 – “Estad quietos, y conoced que yo soy Dios.”" },
  { text: "Respira profundo.", verse: "Isaías 26:3 – “Tú guardarás en completa paz…”" },
  { text: "Nada más importa por un momento.", verse: "Juan 14:27 – “La paz os dejo, mi paz os doy…”" },
  { text: "No tienes que resolverlo todo ya.", verse: "Mateo 11:28 – “Venid a mí todos los que estáis…”" },
  { text: "Solo por hoy, suéltalo.", verse: "Salmo 94:19 – “En la multitud de mis pensamientos…”" },
  { text: "Estás a salvo.", verse: "Salmo 4:8 – “En paz me acostaré…”" },
  { text: "Tu mente puede descansar.", verse: "Filipenses 4:7 – “Y la paz de Dios…”" },
  { text: "Lo que sientes es válido.", verse: "Hebreos 4:15 – “No tenemos un sumo sacerdote…”" },
  { text: "No estás solo.", verse: "Deuteronomio 31:8 – “Jehová va delante de ti…”" },
  { text: "Mereces paz.", verse: "Jeremías 29:11 – “Porque yo sé los planes que tengo…”" }
];

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// 1. Reproducir audio 5s + ocultar botón
playButton.addEventListener("click", async () => {
  alertAudio.play();
  playButton.style.display = "none";
  setTimeout(() => {
    alertAudio.pause();
    alertAudio.currentTime = 0;
  }, 5000);

  // 2. Tras 3s, mostrar ¡BASTA!
  await delay(3000);
  bastaButton.style.display = "inline-block";
});

bastaButton.addEventListener("click", () => {
  bastaButton.style.display = "none";
  startCamera();
});
flipButton.addEventListener("click", () => {
  usingFrontCamera = !usingFrontCamera;
  startCamera();
});

// Capturar foto
captureButton.addEventListener("click", async () => {
  const ctx = canvas.getContext("2d");
  canvas.width = camera.videoWidth;
  canvas.height = camera.videoHeight;
  ctx.drawImage(camera, 0, 0);

  stopCamera();
  await showReveal();
});

function startCamera() {
  if (currentStream) currentStream.getTracks().forEach(t => t.stop());
  navigator.mediaDevices.getUserMedia({
    video: { facingMode: usingFrontCamera ? "user" : "environment" }
  }).then(stream => {
    currentStream = stream;
    camera.srcObject = stream;
    camera.style.display = "block";
    document.getElementById("controls").style.display = "block";
  });
}

function stopCamera() {
  if (currentStream) currentStream.getTracks().forEach(t => t.stop());
  camera.style.display = "none";
  document.getElementById("controls").style.display = "none";
}

async function showReveal() {
  // 4. Foto revelada con fade-in
  photoReveal.src = canvas.toDataURL();
  photoReveal.style.display = "block";
  // forzar reflow antes de opacidad
  requestAnimationFrame(() => {
    photoReveal.style.opacity = "1";
  });
  await delay(5000);
  // efecto desintegración foto
  photoReveal.classList.add("disintegrate");
  await delay(1000);
  photoReveal.style.display = "none";
  photoReveal.style.opacity = "0";
  photoReveal.classList.remove("disintegrate");

  // 5. Mostrar frase (4s) + desintegrar
  const rand = Math.floor(Math.random() * phrases.length);
  message.innerText = phrases[rand].text;
  message.style.display = "block";
  await delay(4000);
  message.classList.add("disintegrate");
  await delay(1000);
  message.style.display = "none";
  message.classList.remove("disintegrate");

  // 6. Mostrar versículo (4s) + desintegrar
  message.innerText = phrases[rand].verse;
  message.style.display = "block";
  await delay(4000);
  message.classList.add("disintegrate");
  await delay(1000);
  message.style.display = "none";
  message.classList.remove("disintegrate");

  // 7. Respiración (3 ciclos) + desintegrar
  breathing.style.display = "block";
  for (let i = 0; i < 3; i++) {
    breathingText.innerText = "Solo respira...";
    await delay(3000);
  }
  breathing.classList.add("disintegrate");
  await delay(1000);
  breathing.style.display = "none";
  breathing.classList.remove("disintegrate");

  // 8. Pantalla final
  finalScreen.style.display = "block";
}
