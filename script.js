
document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("playButton");
  const bastaButton = document.getElementById("bastaButton");
  const alertAudio = document.getElementById("alertAudio");
  const camera = document.getElementById("camera");
  const flipButton = document.getElementById("flipButton");
  const captureButton = document.getElementById("captureButton");
  const canvas = document.getElementById("canvas");
  const photoReveal = document.getElementById("photoReveal");
  const revealedPhoto = document.getElementById("revealedPhoto");
  const message = document.getElementById("message");
  const breathing = document.getElementById("breathing");
  const breathingText = document.getElementById("breathingText");
  const finalScreen = document.getElementById("finalScreen");

  let usingFrontCamera = false;
  let currentStream = null;

  const phrases = [
    { text: "Estás aquí, ahora.", verse: "Salmo 46:10 – “Estad quietos, y conoced que yo soy Dios.”" },
    { text: "Respira profundo.", verse: "Isaías 26:3 – “Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera; porque en ti ha confiado.”" },
    { text: "Nada más importa por un momento.", verse: "Juan 14:27 – “La paz os dejo, mi paz os doy…”" },
    { text: "No tienes que resolverlo todo ya.", verse: "Mateo 11:28 – “Venid a mí todos los que estáis trabajados y cargados…”" },
    { text: "Solo por hoy, suéltalo.", verse: "Salmo 94:19 – “En la multitud de mis pensamientos…”" },
    { text: "Estás a salvo.", verse: "Salmo 4:8 – “En paz me acostaré…”" },
    { text: "Tu mente puede descansar.", verse: "Filipenses 4:7 – “Y la paz de Dios…”" },
    { text: "Lo que sientes es válido.", verse: "Hebreos 4:15 – “No tenemos un sumo sacerdote…”" },
    { text: "No estás solo.", verse: "Deuteronomio 31:8 – “Jehová va delante de ti…”" },
    { text: "Mereces paz.", verse: "Jeremías 29:11 – “Porque yo sé los planes que tengo para vosotros…”" }
  ];

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  playButton.addEventListener("click", async () => {
    alertAudio.play();
    setTimeout(() => {
      alertAudio.pause();
      alertAudio.currentTime = 0;
    }, 5000);

    playButton.style.display = "none";
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

  captureButton.addEventListener("click", async () => {
    const context = canvas.getContext("2d");
    canvas.width = camera.videoWidth;
    canvas.height = camera.videoHeight;
    context.drawImage(camera, 0, 0, canvas.width, canvas.height);
    stopCamera();
    showReveal();
  });

  function startCamera() {
    if (currentStream) {
      currentStream.getTracks().forEach(track => track.stop());
    }
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
    if (currentStream) {
      currentStream.getTracks().forEach(track => track.stop());
    }
    camera.style.display = "none";
    document.getElementById("controls").style.display = "none";
  }

  async function showReveal() {
    canvas.style.display = "none";
    const dataUrl = canvas.toDataURL();
    revealedPhoto.src = dataUrl;
    photoReveal.classList.add("show");

    await delay(4000);
    photoReveal.classList.remove("show");
    photoReveal.style.display = "none";

    const rand = Math.floor(Math.random() * phrases.length);
    message.innerText = phrases[rand].text;
    message.style.display = "block";
    await delay(4000);
    message.style.display = "none";

    message.innerText = phrases[rand].verse;
    message.style.display = "block";
    await delay(4000);
    message.style.display = "none";

    breathing.style.display = "block";
    for (let i = 0; i < 3; i++) {
      breathingText.innerText = "Solo respira...";
      await delay(3000);
    }
    breathing.style.display = "none";

    finalScreen.style.display = "block";
  }
});
