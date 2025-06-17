
const frases = [
  "Respira, todo está bien.",
  "Estás aquí, estás a salvo.",
  "No tienes que resolverlo todo ahora.",
  "Eres más fuerte de lo que crees.",
  "Lo que sientes pasará.",
];

const versiculos = [
  "Filipenses 4:6 – No se inquieten por nada...",
  "Salmos 46:10 – Estad quietos, y conoced que yo soy Dios.",
  "Isaías 41:10 – No temas, porque yo estoy contigo...",
  "Mateo 11:28 – Venid a mí todos los que estáis trabajados...",
  "Juan 14:27 – La paz os dejo, mi paz os doy...",
];

document.addEventListener("DOMContentLoaded", () => {
  const bastaBtn = document.getElementById("bastaBtn");
  const camera = document.getElementById("camera");
  const canvas = document.getElementById("snapshotCanvas");
  const photoPreview = document.getElementById("photoPreview");
  const polaroid = document.getElementById("polaroid");
  const alertSound = document.getElementById("alertSound");
  const fraseEl = document.getElementById("frase");
  const versiculoEl = document.getElementById("versiculo");

  alertSound.play();

  bastaBtn.addEventListener("click", async () => {
    bastaBtn.style.display = "none";

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    camera.srcObject = stream;

    setTimeout(() => {
      const context = canvas.getContext("2d");
      canvas.width = camera.videoWidth;
      canvas.height = camera.videoHeight;
      context.drawImage(camera, 0, 0);
      const dataUrl = canvas.toDataURL("image/png");
      photoPreview.src = dataUrl;
      polaroid.classList.remove("hidden");

      setTimeout(() => {
        polaroid.style.opacity = 0;
        setTimeout(() => {
          polaroid.remove();
          const frase = frases[Math.floor(Math.random() * frases.length)];
          const versiculo = versiculos[Math.floor(Math.random() * versiculos.length)];
          fraseEl.textContent = frase;
          fraseEl.style.opacity = 1;

          setTimeout(() => {
            fraseEl.style.opacity = 0;
            setTimeout(() => {
              versiculoEl.textContent = versiculo;
              versiculoEl.style.opacity = 1;
            }, 2000);
          }, 4000);
        }, 1000);
      }, 3000);
    }, 3000);
  });
});
