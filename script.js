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

  alerta.play().catch(() => {});
  setTimeout(() => btn.style.display = 'inline-block', 3500);

  let stream;
  let front = true;

  btn.onclick = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: (front ? "user" : "environment") }
      });
      video.srcObject = stream;

      crearBotonesCaptura();
    } catch (err) {
      alert("No se pudo acceder a la cámara");
    }
  };

  function crearBotonesCaptura() {
    let capture = document.createElement('button');
    capture.textContent = "Capturar";
    capture.onclick = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const foto = canvas.toDataURL('image/jpeg');
      img.src = foto;
      img.style.display = 'block';
      setTimeout(() => img.classList.add('fade-out'), 5000);

      setTimeout(() => {
        fraseDiv.innerText = frases[Math.floor(Math.random() * frases.length)];
      }, 5500);

      setTimeout(() => {
        fraseDiv.innerText = "";
        versiculoDiv.innerText = versiculos[Math.floor(Math.random() * versiculos.length)];
      }, 12500);
    };

    let girar = document.createElement('button');
    girar.textContent = "Cambiar cámara";
    girar.onclick = () => {
      front = !front;
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
      btn.click();
    };

    document.body.appendChild(capture);
    document.body.appendChild(girar);
  }
};
