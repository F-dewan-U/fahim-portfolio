/* ===== PARTICLES ===== */
(function() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];
  const COUNT = 120;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.15 + 0.05,
        drift: (Math.random() - 0.5) * 0.1
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,201,167,${s.alpha})`;
      ctx.fill();
      s.y -= s.speed;
      s.x += s.drift;
      if (s.y < -2) { s.y = canvas.height + 2; s.x = Math.random() * canvas.width; }
      if (s.x < 0 || s.x > canvas.width) { s.x = Math.random() * canvas.width; }
    });
    requestAnimationFrame(drawStars);
  }

  resize();
  initStars();
  drawStars();
  window.addEventListener('resize', () => { resize(); initStars(); });
})();

/* ===== TYPING ANIMATION ===== */
(function() {
  const roles = [
    'CST Student',
    'Web Creator',
    'Telegram Mini App Developer',
    'Digital Builder',
    'Stock Media Creator'
  ];
  let ri = 0, ci = 0, deleting = false;
  const el = document.getElementById('typing');

  function type() {
    const current = roles[ri];
    if (!deleting) {
      el.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 60 : 90);
  }
  type();
})();

/* ===== NAV SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ===== SMOOTH SCROLL FOR ALL NAV LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
      // Close mobile menu
      const navLinks = document.getElementById('nav-links');
      const hamburger = document.getElementById('hamburger');
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
});

/* ===== ACTIVE NAV HIGHLIGHT ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => observer.observe(s));

/* ===== HAMBURGER ===== */
document.getElementById('hamburger').addEventListener('click', function() {
  this.classList.toggle('open');
  document.getElementById('nav-links').classList.toggle('open');
});

/* ===== REVEAL ON SCROLL ===== */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ===== BACK TO TOP ===== */
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 400);
});

/* ===== CONTACT FORM ===== */
function handleSend() {
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg = document.getElementById('fmessage').value.trim();
  if (!name || !email || !msg) {
    alert('Please fill in at least your name, email, and message.');
    return;
  }
  const btn = document.getElementById('send-btn');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('form-success').classList.remove('hidden');
    btn.style.display = 'none';
    document.getElementById('fname').value = '';
    document.getElementById('femail').value = '';
    document.getElementById('fphone').value = '';
    document.getElementById('fsubject').value = '';
    document.getElementById('fmessage').value = '';
  }, 1200);
}
