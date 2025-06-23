let stream;
let currentCamera = 'environment';

const frases = [
  { texto: "Estás aquí, ahora.", versiculo: "Salmo 46:10 – “Estad quietos, y conoced que yo soy Dios.”" },
  { texto: "Respira profundo.", versiculo: "Isaías 26:3 – “Tú guardarás en completa paz...”" },
  { texto: "Nada más importa por un momento.", versiculo: "Juan 14:27 – “La paz os dejo, mi paz os doy...”" },
  { texto: "No tienes que resolverlo todo ya.", versiculo: "Mateo 11:28 – “Venid a mí todos los que estáis trabajados...”" },
  { texto: "Solo por hoy, suéltalo.", versiculo: "Salmo 94:19 – “Tus consolaciones alegraban mi alma.”" },
  { texto: "Estás a salvo.", versiculo: "Salmo 4:8 – “En paz me acostaré...”" },
  { texto: "Tu mente puede descansar.", versiculo: "Filipenses 4:7 – “La paz de Dios... guardará vuestros corazones...”" },
  { texto: "Lo que sientes es válido.", versiculo: "Hebreos 4:15 – “No tenemos un sumo sacerdote que no pueda compadecerse...”" },
  { texto: "No estás solo.", versiculo: "Deuteronomio 31:8 – “Él estará contigo...”" },
  { texto: "Mereces paz.", versiculo: "Jeremías 29:11 – “Planes de bienestar y no de calamidad...”" }
];

// Inicio: botón play
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  const audio = document.getElementById("alerta");
  audio.play();
  setTimeout(() => {
    document.getElementById("bastaContainer").classList.remove("hidden");
  }, 3000);
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 5000);
});

// Abrir cámara
async function openCamera() {
  document.getElementById("bastaContainer").classList.add("hidden");
  document.getElementById("cameraContainer").classList.remove("hidden");

  stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: currentCamera }
  });

  document.getElementById("video").srcObject = stream;
}

// Cambiar cámara
function switchCamera() {
  currentCamera = currentCamera === 'environment' ? 'user' : 'environment';
  if (stream) stream.getTracks().forEach(track => track.stop());
  openCamera();
}

// Tomar foto
function takePhoto() {
  const video = document.getElementById("video");
  const canvas = document.getElementById("snapshot");
  const context = canvas.getContext("2d");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  stream.getTracks().forEach(track => track.stop());

  document.getElementById("cameraContainer").classList.add("hidden");
  document.getElementById("polaroidContainer").classList.remove("hidden");

  setTimeout(() => {
    canvas.classList.add("revealed");
  }, 200);

  setTimeout(() => {
    document.getElementById("polaroidContainer").classList.add("disintegrate");
  }, 8200);

  setTimeout(() => {
    document.getElementById("polaroidContainer").classList.add("hidden");
    showFrase();
  }, 9600);
}

// Mostrar frase y versículo
function showFrase() {
  const { texto, versiculo } = frases[Math.floor(Math.random() * frases.length)];
  const container = document.getElementById("textContainer");
  const fraseElem = document.getElementById("frase");
  const versiculoElem = document.getElementById("versiculo");

  container.classList.remove("hidden");
  fraseElem.innerText = texto;

  setTimeout(() => {
    fraseElem.classList.add("hidden");
    versiculoElem.classList.remove("hidden");
    versiculoElem.innerText = versiculo;
  }, 4000);

  setTimeout(() => {
    document.getElementById("textContainer").classList.add("hidden");
    showClosing();
  }, 9000);
}

// Mostrar cierre con animación + botón
function showClosing() {
  const closing = document.getElementById("closingContainer");
  closing.classList.remove("hidden");

  // mostrar botón después del fadeOut
  setTimeout(() => {
    document.getElementById("restartBtn").classList.remove("hidden");
    document.getElementById("marcaFinal").classList.remove("hidden");
  }, 8000);
}

// Reiniciar experiencia
function restart() {
  location.reload();
}
