
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


// === MODAL: abrir/cerrar ===
document.addEventListener('DOMContentLoaded', () => {
  const openButtons = document.querySelectorAll('[data-open]');
  const closeAttr = '[data-close]';

  // abrir
  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-open');
      const modal = document.getElementById(id);
      if (!modal) return;
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open'); // bloquea scroll del fondo
    });
  });

  // cerrar (X o fondo)
  document.addEventListener('click', (e) => {
    if (e.target.matches(closeAttr)) {
      const modal = e.target.closest('.modal');
      if (!modal) return;
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }
  });

  // cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal[aria-hidden="false"]').forEach(m =>
        m.setAttribute('aria-hidden', 'true')
      );
      document.body.classList.remove('modal-open');
    }
  });
});

// === SCROLL con offset del header fijo ===
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.contenedor-header');
  const getHeaderH = () => header ? header.getBoundingClientRect().height : 0;

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.pageYOffset - getHeaderH() - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
});







 


 



