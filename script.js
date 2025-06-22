let stream;
let currentCamera = 'environment';

const frases = [
    { texto: "Estás aquí, ahora.", versiculo: "Salmo 46:10 – “Estad quietos, y conoced que yo soy Dios.”" },
    { texto: "Respira profundo.", versiculo: "Isaías 26:3 – “Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera; porque en ti ha confiado.”" },
    { texto: "Nada más importa por un momento.", versiculo: "Juan 14:27 – “La paz os dejo, mi paz os doy; no se turbe vuestro corazón, ni tenga miedo.”" },
    { texto: "No tienes que resolverlo todo ya.", versiculo: "Mateo 11:28 – “Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.”" },
    { texto: "Solo por hoy, suéltalo.", versiculo: "Salmo 94:19 – “Tus consolaciones alegraban mi alma.”" },
    { texto: "Estás a salvo.", versiculo: "Salmo 4:8 – “En paz me acostaré... porque solo tú, Jehová, me haces vivir confiado.”" },
    { texto: "Tu mente puede descansar.", versiculo: "Filipenses 4:7 – “La paz de Dios... guardará vuestros corazones y pensamientos.”" },
    { texto: "Lo que sientes es válido.", versiculo: "Hebreos 4:15 – “No tenemos un sumo sacerdote que no pueda compadecerse...”" },
    { texto: "No estás solo.", versiculo: "Deuteronomio 31:8 – “Él estará contigo, no te dejará ni te desamparará.”" },
    { texto: "Mereces paz.", versiculo: "Jeremías 29:11 – “Planes de bienestar y no de calamidad...”" }
];

function startExperience() {
    document.getElementById('overlay').style.display = 'none';
    const audio = document.getElementById('alerta');
    audio.play();

    setTimeout(() => {
        document.getElementById('bastaContainer').classList.remove('hidden');
    }, 3000);
}

async function openCamera() {
    document.getElementById('bastaContainer').classList.add('hidden');
    document.getElementById('cameraContainer').classList.remove('hidden');

    stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: currentCamera }
    });

    document.getElementById('video').srcObject = stream;
}

function switchCamera() {
    currentCamera = currentCamera === 'environment' ? 'user' : 'environment';
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    openCamera();
}

function takePhoto() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('snapshot');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    stream.getTracks().forEach(track => track.stop());

    document.getElementById('cameraContainer').classList.add('hidden');
    document.getElementById('polaroidContainer').classList.remove('hidden');

    setTimeout(() => {
        canvas.style.opacity = 1;
    }, 100);

    setTimeout(() => {
        document.getElementById('polaroidContainer').classList.add('hidden');
        showFrase();
    }, 6000);
}

function showFrase() {
    const { texto, versiculo } = frases[Math.floor(Math.random() * frases.length)];
    const textContainer = document.getElementById('textContainer');
    textContainer.classList.remove('hidden');
    document.getElementById('frase').innerText = texto;

    setTimeout(() => {
        document.getElementById('frase').style.display = 'none';
        document.getElementById('versiculo').innerText = versiculo;
    }, 4000);
}
