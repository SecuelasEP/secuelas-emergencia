const frases = [
  "Respira. Todo pasará.",
  "No estás sola.",
  "Dios cuida de ti.",
  "Eres más fuerte de lo que piensas."
];

const versiculos = [
  "Salmo 34:18 — El Señor está cerca de los quebrantados de corazón.",
  "Isaías 41:10 — No temas, porque yo estoy contigo.",
  "Filipenses 4:6 — No se inquieten por nada, oren por todo.",
  "Mateo 11:28 — Venid a mí todos los que estáis cansados y cargados, y yo os haré descansar."
];

window.onload = () => {
  const alerta = document.getElementById('alerta');
  const btn = document.getElementById('bastaBtn');
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const img = document.getElementById('polaroid');
  const fraseDiv = document.getElementById('frase');
  const versiculoDiv = document.getElementById('versiculo');
  const ui = document.querySelector('.camara-ui');
  const capturar = document.getElementById('capturar');
  const girar = document.getElementById('girar');

  alerta.play().catch(() => {});
  setTimeout(() => btn.style.display = 'inline-block', 3000);

  let stream;
  let front = true;

  btn.onclick = async () => {
    btn.style.display = 'none';
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: (front ? "user" : "environment") }
      });
      video.srcObject = stream;
      video.style.display = 'block';
      ui.style.display = 'flex';
    } catch (err) {
      alert("No se pudo acceder a la cámara");
    }
  };

  capturar.onclick = () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 
