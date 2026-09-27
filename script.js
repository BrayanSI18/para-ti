/* ===================================================
   FLORES AMARILLAS - 21 DE SEPTIEMBRE
   Lógica Interactiva, Partículas, Música & Efectos
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de componentes
  initPetalsCanvas();
  initFlowerInteraction();
  initEnvelope();
  initMagicCards();
  initGarden();
  initQuotes();
  initCustomizer();
  initAudioSynthesizer();
  initPetalRainButton();
  loadUrlParameters();
});

/* ===================================================
   1. CANVAS DE PÉTALOS FLOTANTES DE FLORES AMARILLAS
   =================================================== */
function initPetalsCanvas() {
  const canvas = document.getElementById('petalsCanvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petalColors = [
    'rgba(255, 235, 59, 0.9)',   // Amarillo brillante
    'rgba(255, 213, 79, 0.95)',  // Amarillo dorado
    'rgba(255, 193, 7, 0.9)',    // Girasol ámbar
    'rgba(229, 57, 53, 0.85)',   // Pétalo rojo pasión
    'rgba(255, 23, 68, 0.85)',   // Rojo rubí
    'rgba(255, 255, 255, 0.85)', // Pétalo blanco puro
    'rgba(226, 232, 240, 0.9)'   // Pétalo plata suave
  ];

  class Petal {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * -height;
      this.size = Math.random() * 12 + 8;
      this.speedY = Math.random() * 1.5 + 0.8;
      this.speedX = Math.random() * 1.2 - 0.6;
      this.angle = Math.random() * 360;
      this.spin = Math.random() * 2 - 1;
      this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
      this.opacity = Math.random() * 0.7 + 0.3;
      this.swaySpeed = Math.random() * 0.02 + 0.01;
      this.swayFactor = Math.random() * 2 + 1;
      this.time = Math.random() * 100;
    }

    update() {
      this.time += this.swaySpeed;
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.time) * this.swayFactor;
      this.angle += this.spin;

      if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
        this.reset();
        this.y = -20;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;

      ctx.fillStyle = this.color;
      ctx.beginPath();
      // Dibujar forma de pétalo orgánico
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size * 1.6);
      ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
      ctx.fill();

      // Brillo suave en el centro del pétalo
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, this.size * 1.2);
      ctx.stroke();

      ctx.restore();
    }
  }

  const petalsCount = Math.min(Math.floor(width / 35), 45);
  const petals = Array.from({ length: petalsCount }, () => new Petal());

  function animate() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();

  // Función global para crear lluvia intensa de pétalos
  window.triggerPetalRain = function (count = 35) {
    for (let i = 0; i < count; i++) {
      const extraPetal = new Petal();
      extraPetal.y = -20 - Math.random() * 200;
      extraPetal.speedY = Math.random() * 3 + 2;
      petals.push(extraPetal);
    }
    // Remover los extra tras un tiempo
    setTimeout(() => {
      if (petals.length > petalsCount) {
        petals.splice(petalsCount, petals.length - petalsCount);
      }
    }, 9000);
  };
}

/* ===================================================
   2. FLOR CENTRAL INTERACTIVA & MENSAJES
   =================================================== */
function initFlowerInteraction() {
  const flower = document.getElementById('interactiveFlower');
  const toast = document.getElementById('flowerToast');
  const toastText = document.getElementById('flowerToastText');
  const toastIcon = document.getElementById('flowerToastIcon');

  const flowerQuotes = [
    '🌻 "Cesia Jael, tu sonrisa es como un rayo de sol que ilumina todo."',
    '💛 "Para mí, tú eres la flor más hermosa de este 21 de septiembre, Cesia Jael."',
    '✨ "Que este día te llene de tanta alegría como la que tú regalas, Cesia."',
    '🌻 "Hoy pensé en ti, Cesia Jael, y quise regalarte este pedacito de luz."',
    '🌟 "Cesia Jael: un millón de flores amarillas para la persona más especial."',
    '🌼 "¡Gracias por hacer este mundo un lugar mucho más lindo y feliz, Cesia Jael!"'
  ];

  const flowerIcons = ['🌻', '💛', '🌼', '✨', '💐', '🌟'];

  let quoteIdx = 0;
  let toastTimer = null;

  flower.addEventListener('click', (e) => {
    // Animación de impulso al hacer click
    flower.style.transform = 'scale(1.2) rotate(8deg)';
    setTimeout(() => {
      flower.style.transform = '';
    }, 300);

    // Reproducir nota mágica
    playTone(523.25, 0.4); // C5
    setTimeout(() => playTone(659.25, 0.4), 100); // E5
    setTimeout(() => playTone(783.99, 0.6), 200); // G5

    // Mostrar Toast con mensaje
    quoteIdx = (quoteIdx + 1) % flowerQuotes.length;
    toastText.textContent = flowerQuotes[quoteIdx];
    toastIcon.textContent = flowerIcons[quoteIdx % flowerIcons.length];

    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);

    // Crear destello de partículas en el cursor
    createSparkles(e.clientX, e.clientY);
  });
}

/* ===================================================
   3. CARTA VIRTUAL / SOBRE 3D
   =================================================== */
function initEnvelope() {
  const envelopeBox = document.getElementById('envelopeBox');
  const openLetterBtn = document.getElementById('openLetterBtn');
  const cartaSection = document.getElementById('carta');

  function toggleEnvelope() {
    envelopeBox.classList.toggle('open');
    if (envelopeBox.classList.contains('open')) {
      playTone(440, 0.2);
      setTimeout(() => playTone(554.37, 0.3), 150);
      window.triggerPetalRain(15);
    }
  }

  envelopeBox.addEventListener('click', toggleEnvelope);

  openLetterBtn.addEventListener('click', () => {
    cartaSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      if (!envelopeBox.classList.contains('open')) {
        envelopeBox.classList.add('open');
        playTone(440, 0.2);
        setTimeout(() => playTone(554.37, 0.3), 150);
        window.triggerPetalRain(20);
      }
    }, 600);
  });
}

/* ===================================================
   4. TARJETAS MÁGICAS (FLIP CARDS PARA TOUCH & CLICK)
   =================================================== */
function initMagicCards() {
  const cards = document.querySelectorAll('.magic-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      playTone(587.33, 0.2); // D5
    });
  });
}

/* ===================================================
   5. JARDÍN MÁGICO INTERACTIVO
   =================================================== */
function initGarden() {
  const gardenArea = document.getElementById('gardenArea');
  const plantedCount = document.getElementById('plantedCount');
  const prompt = gardenArea.querySelector('.garden-prompt');

  let count = 0;
  const compliments = [
    'Brillante 🌻',
    'Hermosa ✨',
    'Amor 💛',
    'Inolvidable 🌼',
    'Luz ☀️',
    'Sonrisa 🌟',
    'Mágica 💫',
    'Ternura 🍯',
    'Alegría 🌸',
    'Especial 💛'
  ];

  gardenArea.addEventListener('click', (e) => {
    const rect = gardenArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (prompt) {
      prompt.style.opacity = '0';
    }

    count++;
    plantedCount.textContent = count;

    // Crear la flor plantada
    const flower = document.createElement('div');
    flower.className = 'planted-flower';
    flower.style.left = `${x}px`;
    flower.style.top = `${y}px`;

    const randomWord = compliments[Math.floor(Math.random() * compliments.length)];
    flower.innerHTML = `
      <span class="flower-icon">🌻</span>
      <span class="flower-word">${randomWord}</span>
    `;

    gardenArea.appendChild(flower);

    // Sonido suave de florecimiento
    const gardenFreqs = [440, 493.88, 523.25, 587.33, 659.25, 783.99];
    const randFreq = gardenFreqs[Math.floor(Math.random() * gardenFreqs.length)];
    playTone(randFreq, 0.3);

    // Limitar flores para rendimiento
    const maxGardenFlowers = 25;
    const flowers = gardenArea.querySelectorAll('.planted-flower');
    if (flowers.length > maxGardenFlowers) {
      flowers[0].remove();
    }
  });
}

/* ===================================================
   6. GENERADOR DE MENSAJES & FRASES
   =================================================== */
function initQuotes() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const quoteAuthor = document.getElementById('quoteAuthor');
  const nextQuoteBtn = document.getElementById('nextQuoteBtn');

  const quotesList = [
    {
      text: '"Cesia Jael, tu luz brilla con tanta fuerza y ternura que hace que cada día sea mucho más hermoso."',
      author: '— Para Cesia Jael con cariño 💛'
    },
    {
      text: '"El amarillo es el color del sol, de la alegría y de las personas que hacen de nuestra vida un lugar más cálido."',
      author: '— Tradición del 21 de Septiembre'
    },
    {
      text: '"Un millón de flores amarillas nunca serán suficientes para agradecer lo lindo que es tenerte en mi vida, Cesia Jael."',
      author: '— Con Todo Mi Corazón 🌻'
    },
    {
      text: '"Regalar flores amarillas es decirte: quiero verte sonreír y estar contigo siempre."',
      author: '— Amor y Primavera'
    },
    {
      text: '"Hay personas que son como girasoles: no importa cuán oscuro esté el cielo, siempre buscan la luz y la comparten."',
      author: '— Dedicatoria Especial'
    }
  ];

  let currentIdx = 0;

  nextQuoteBtn.addEventListener('click', () => {
    quoteDisplay.style.opacity = '0';
    playTone(659.25, 0.2);

    setTimeout(() => {
      currentIdx = (currentIdx + 1) % quotesList.length;
      quoteDisplay.textContent = quotesList[currentIdx].text;
      quoteAuthor.textContent = quotesList[currentIdx].author;
      quoteDisplay.style.opacity = '1';
    }, 400);
  });
}

/* ===================================================
   7. BOTÓN LLUVIA DE FLORES
   =================================================== */
function initPetalRainButton() {
  const rainBtn = document.getElementById('rainBlossomBtn');
  rainBtn.addEventListener('click', () => {
    window.triggerPetalRain(40);
    playTone(523.25, 0.2);
    setTimeout(() => playTone(659.25, 0.2), 100);
    setTimeout(() => playTone(783.99, 0.3), 200);
    setTimeout(() => playTone(1046.5, 0.4), 300);
  });
}

/* ===================================================
   8. PERSONALIZADOR DE DEDICATORIA & URL PARAMS
   =================================================== */
function initCustomizer() {
  const modal = document.getElementById('customizeModal');
  const openBtn = document.getElementById('openCustomizeModalBtn');
  const closeBtn = document.getElementById('closeCustomizeModalBtn');
  const saveBtn = document.getElementById('saveCustomizeBtn');
  const copyLinkBtn = document.getElementById('copyShareLinkBtn');

  const inputRecipient = document.getElementById('inputRecipient');
  const inputSender = document.getElementById('inputSender');
  const inputMessage = document.getElementById('inputMessage');

  const recipientDisplay = document.getElementById('recipientDisplay');
  const letterGreeting = document.getElementById('letterGreeting');
  const letterCustomBody = document.getElementById('letterCustomBody');
  const letterSignature = document.getElementById('letterSignature');

  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  saveBtn.addEventListener('click', () => {
    const to = inputRecipient.value.trim();
    const from = inputSender.value.trim();
    const msg = inputMessage.value.trim();

    if (to) {
      recipientDisplay.textContent = `Para ${to}`;
      letterGreeting.textContent = `Para ${to},`;
    }

    if (msg) {
      letterCustomBody.innerHTML = msg.replace(/\n/g, '<br><br>');
    }

    if (from) {
      letterSignature.innerHTML = `<span>Con todo mi cariño,</span><strong>${from} 🌻</strong>`;
    }

    modal.classList.remove('active');
    showNotification('¡Dedicatoria actualizada exitosamente! 💛');
    window.triggerPetalRain(25);
  });

  copyLinkBtn.addEventListener('click', () => {
    const to = inputRecipient.value.trim();
    const from = inputSender.value.trim();
    const msg = inputMessage.value.trim();

    const params = new URLSearchParams();
    if (to) params.set('to', to);
    if (from) params.set('from', from);
    if (msg) params.set('msg', msg);

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      showNotification('¡Enlace personalizado copiado al portapapeles! 📋✨');
    }).catch(() => {
      prompt('Copia este enlace para compartir:', shareUrl);
    });
  });
}

function loadUrlParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const to = urlParams.get('to');
  const from = urlParams.get('from');
  const msg = urlParams.get('msg');

  const recipientDisplay = document.getElementById('recipientDisplay');
  const letterGreeting = document.getElementById('letterGreeting');
  const letterCustomBody = document.getElementById('letterCustomBody');
  const letterSignature = document.getElementById('letterSignature');

  const inputRecipient = document.getElementById('inputRecipient');
  const inputSender = document.getElementById('inputSender');
  const inputMessage = document.getElementById('inputMessage');

  if (to) {
    recipientDisplay.textContent = `Para ${to}`;
    letterGreeting.textContent = `Para ${to},`;
    if (inputRecipient) inputRecipient.value = to;
  }

  if (msg) {
    letterCustomBody.innerHTML = msg.replace(/\n/g, '<br><br>');
    if (inputMessage) inputMessage.value = msg;
  }

  if (from) {
    letterSignature.innerHTML = `<span>Con todo mi cariño,</span><strong>${from} 🌻</strong>`;
    if (inputSender) inputSender.value = from;
  }
}

function showNotification(msg) {
  const toast = document.getElementById('flowerToast');
  const toastText = document.getElementById('flowerToastText');
  const toastIcon = document.getElementById('flowerToastIcon');

  toastIcon.textContent = '💛';
  toastText.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ===================================================
   9. EFECTO DE DESTELLOS DE LUZ (SPARKLES)
   =================================================== */
function createSparkles(x, y) {
  const sparkleColors = [
    { bg: '#ffffff', shadow: '#38bdf8' }, // Blanco / Azul
    { bg: '#ffd54f', shadow: '#ffb300' }, // Amarillo
    { bg: '#ff5252', shadow: '#ff1744' }, // Rojo
    { bg: '#e2e8f0', shadow: '#94a3b8' }  // Plomo / Plata
  ];

  for (let i = 0; i < 14; i++) {
    const sparkle = document.createElement('div');
    const colorObj = sparkleColors[i % sparkleColors.length];
    sparkle.style.position = 'fixed';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.width = '8px';
    sparkle.style.height = '8px';
    sparkle.style.backgroundColor = colorObj.bg;
    sparkle.style.boxShadow = `0 0 12px ${colorObj.shadow}`;
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';

    const angle = (i * 30 * Math.PI) / 180;
    const distance = Math.random() * 60 + 30;
    const destX = x + Math.cos(angle) * distance;
    const destY = y + Math.sin(angle) * distance;

    document.body.appendChild(sparkle);

    sparkle.animate(
      [
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${destX - x}px, ${destY - y}px) scale(0)`, opacity: 0 }
      ],
      {
        duration: 800 + Math.random() * 400,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
      }
    ).onfinish = () => sparkle.remove();
  }
}

/* ===================================================
   10. SINTETIZADOR DE MÚSICA ROMÁNTICA AMBIENTAL
   (Web Audio API - Sin requerir archivos externos)
   =================================================== */
let audioCtx = null;
let isMusicPlaying = false;
let musicInterval = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq, duration = 0.4) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Silently ignore if audio blocked by browser policy
  }
}

function initAudioSynthesizer() {
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicStatusText = document.getElementById('musicStatusText');

  // Melodía romántica y relajante de Flores Amarillas / Acordes suaves
  const melodyNotes = [
    392.0, 440.0, 493.88, 523.25, 587.33, 659.25, 783.99, // G4, A4, B4, C5, D5, E5, G5
    659.25, 587.33, 523.25, 493.88, 440.0, 392.0
  ];

  let noteIndex = 0;

  function startAmbientMelody() {
    isMusicPlaying = true;
    musicToggleBtn.classList.add('playing');
    musicStatusText.textContent = 'Música: Sonando 🎵';

    musicInterval = setInterval(() => {
      const note = melodyNotes[noteIndex % melodyNotes.length];
      playTone(note, 0.7);
      noteIndex++;
    }, 750);
  }

  function stopAmbientMelody() {
    isMusicPlaying = false;
    musicToggleBtn.classList.remove('playing');
    musicStatusText.textContent = 'Música: Silencio';
    clearInterval(musicInterval);
  }

  musicToggleBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
      stopAmbientMelody();
    } else {
      startAmbientMelody();
    }
  });
}
