
const alerta = document.getElementById("alerta");
const inicio = document.getElementById("inicio");
const play = document.getElementById("play");
const basta = document.getElementById("basta");
const camara = document.getElementById("camara");
const video = document.getElementById("video");
const capturar = document.getElementById("capturar");
const voltear = document.getElementById("voltear");
const canvas = document.getElementById("canvas");
const polaroid = document.getElementById("polaroid");
const foto = document.getElementById("foto");
const disolver = document.getElementById("disolver");
const frase = document.getElementById("frase");
const versiculo = document.getElementById("versiculo");

let stream, usarFrontal = false;

const frases = [
  "Respira, todo estará bien.",
  "Estás a salvo ahora.",
  "Suelta ese pensamiento."
];

const versiculos = [
  "Salmo 46:1 – Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones."
];

play.onclick = () => {
  inicio.style.display = "none";
  alerta.play();
  setTimeout(() => {
    basta.style.display = "inline-block";
  }, 3000);
};

basta.onclick = async () => {
  basta.style.display = "none";
  camara.style.display = "flex";
  await encenderCamara();
};

voltear.onclick = () => {
  usarFrontal = !usarFrontal;
  encenderCamara();
};

capturar.onclick = () => {
  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);
  detenerCamara();
  camara.style.display = "none";

  foto.src = canvas.toDataURL();
  polaroid.style.display = "block";
  setTimeout(() => { foto.style.opacity = 1; }, 300);

  setTimeout(() => {
    disolver.classList.add("disolver");
    foto.classList.add("disolver");
  }, 4000);

  setTimeout(() => {
    polaroid.style.display = "none";
    frase.textContent = frases[Math.floor(Math.random() * frases.length)];
    frase.style.opacity = 1;
  }, 6000);

  setTimeout(() => {
    frase.style.opacity = 0;
    setTimeout(() => {
      versiculo.textContent = versiculos[0];
      versiculo.style.opacity = 1;
    }, 1000);
  }, 10000);
};

async function encenderCamara() {
  if (stream) stream.getTracks().forEach(t => t.stop());
  stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: usarFrontal ? "user" : "environment" },
    audio: false
  });
  video.srcObject = stream;
}

function detenerCamara() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
  }
}
