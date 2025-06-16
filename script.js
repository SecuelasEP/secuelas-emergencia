
const startBtn = document.getElementById('startBtn');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const phrase = document.getElementById('phrase');
const verse = document.getElementById('verse');
const cameraContainer = document.getElementById('cameraContainer');
const resultContainer = document.getElementById('resultContainer');
const captureBtn = document.getElementById('captureBtn');
const audio = document.getElementById('startAudio');

const phrases = [
  "Respira, estás aquí y ahora.",
  "No todo merece tanto espacio en tu mente.",
  "No estás solo en lo que sientes.",
  "Este momento también pasará.",
  "Tu valor no depende de tus pensamientos."
];

const verses = [
  "“Echen toda su ansiedad sobre Él, porque Él cuida de ustedes.” — 1 Pedro 5:7",
  "“Venid a mí todos los que estáis cansados y cargados, y yo os haré descansar.” — Mateo 11:28",
  "“El Señor está cerca de los quebrantados de corazón.” — Salmo 34:18",
  "“No se turbe vuestro corazón, ni tenga miedo.” — Juan 14:27"
];

startBtn.onclick = () => {
  audio.play();
  startBtn.classList.add('hidden');
  cameraContainer.classList.remove('hidden');
  navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
  });
};

captureBtn.onclick = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  const data = canvas.toDataURL('image/png');
  photo.src = data;
  cameraContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  phrase.textContent = phrases[Math.floor(Math.random() * phrases.length)];
  verse.textContent = verses[Math.floor(Math.random() * verses.length)];
};
    