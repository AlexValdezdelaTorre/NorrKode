
const canvas = document.getElementById('fondoAnimado');
const ctx = canvas.getContext('2d');

let runasCayendo = [];
const runas = ['ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚹ'];

// Función para inicializar runas según tamaño de pantalla
function initRunas() {
  const ancho = window.innerWidth;

  // Factor de escala para tamaños de runa (desktop = 1)
  let factor = 1;
  if(ancho <= 480) factor = 0.5;       // móviles pequeños
  else if(ancho <= 768) factor = 0.7;  // tablet
  else if(ancho <= 1024) factor = 0.85; // laptops pequeños

  // Cantidad de runas según pantalla
  const cantidad = ancho <= 480 ? 15 : ancho <= 768 ? 20 : 30;

  runasCayendo = [];
  for(let i = 0; i < cantidad; i++) {
    runasCayendo.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      velocidad: 1 + Math.random() * 3,
      simbolo: runas[Math.floor(Math.random() * runas.length)],
      tamaño: (20 + Math.random() * 20) * factor, 
      alpha: 0.6 + Math.random() * 0.4,
      oscilacion: Math.random() * 50,
      fase: Math.random() * Math.PI * 2
    });
  }
}

// Ajustar canvas y reinicializar runas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initRunas();
}

// Llamada inicial
resizeCanvas();

// Redimensionar
window.addEventListener('resize', resizeCanvas);

// Dibujar runas
function dibujar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(let i = 0; i < runasCayendo.length; i++) {
    let r = runasCayendo[i];

    ctx.fillStyle = `rgba(26, 59, 143, ${r.alpha})`;
    ctx.font = `${r.tamaño}px Arial`;

    let xMov = r.x + Math.sin(r.y / 50 + r.fase) * 10;
    ctx.fillText(r.simbolo, xMov, r.y);

    r.y += r.velocidad;

    if(r.y > canvas.height) {
      r.y = -r.tamaño;
      r.x = Math.random() * canvas.width;
      r.fase = Math.random() * Math.PI * 2;
    }
  }

  requestAnimationFrame(dibujar);
}

dibujar();

(function () {
  const header = document.querySelector('.contenedor-header');
  const links = document.querySelectorAll('.menu-container a[href^="#"]');

  if (!header || !links.length) return;

  const getOffset = () => (header.offsetHeight || 0) + 12;
  
  const extraById = {
  '#portafolio': 60,  
  '#servicios': 60
};

  function scrollWithOffset(hash, push = true) {
    const el = document.querySelector(hash);
    if (!el) return;
    const extra = (hash === '#portafolio' || hash === '#servicios') ? 60 : 0;

const y = el.getBoundingClientRect().top + window.scrollY - (getOffset() + extra);
    window.scrollTo({ top: y, behavior: 'smooth' });
    if (push) history.pushState(null, '', hash);
  }

  // Clicks del menú
  links.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      scrollWithOffset(a.getAttribute('href'));
    });
  });

  
  window.addEventListener('load', () => {
    if (location.hash) {
      setTimeout(() => scrollWithOffset(location.hash, false), 0);
    }
  });
})();






 


 



