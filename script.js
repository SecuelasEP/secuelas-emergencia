
const audio = document.getElementById('alert-sound');
const bastaBtn = document.getElementById('basta-button');
const cameraContainer = document.getElementById('camera-container');
const takePhotoBtn = document.getElementById('take-photo');
const video = document.getElementById('camera');
const photoContainer = document.getElementById('photo-container');
const capturedPhoto = document.getElementById('captured-photo');
const phraseDiv = document.getElementById('phrase');
const verseDiv = document.getElementById('verse');

const phrases = [
  "No estás solo.",
  "Respira profundo.",
  "Esto también pasará.",
  "Estás a salvo aquí.",
];

const verses = [
  "Salmo 34:18 — El Señor está cerca de los quebrantados de corazón.",
  "Isaías 41:10 — No temas, porque yo estoy contigo.",
  "Mateo 11:28 — Venid a mí todos los que estáis trabajados y cargados.",
  "Filipenses 4:6 — No se inquieten por nada, más bien oren.",
];

window.onload = () => {
  audio.play();
  setTimeout(() => {
    bastaBtn.style.display = 'block';
  }, 5000);
};

bastaBtn.addEventListener('click', async () => {
  bastaBtn.style.display = 'none';
  cameraContainer.classList.remove('hidden');
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
  video.srcObject = stream;
});

takePhotoBtn.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  const dataUrl = canvas.toDataURL();
  capturedPhoto.src = dataUrl;
  cameraContainer.classList.add('hidden');
  photoContainer.classList.remove('hidden');

  setTimeout(() => {
    photoContainer.classList.add('hidden');
    showPhrase();
  }, 5000);
});

function showPhrase() {
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  phraseDiv.textContent = phrase;
  phraseDiv.classList.remove('hidden');
  setTimeout(() => {
    phraseDiv.classList.add('hidden');
    showVerse();
  }, 7000);
}

function showVerse() {
  const verse = verses[Math.floor(Math.random() * verses.length)];
  verseDiv.textContent = verse;
  verseDiv.classList.remove('hidden');
}
