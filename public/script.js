/* =====================================================
   EDEN INVITATION — script.js
   ===================================================== */

/* ---- 1. CONFETTIS AU CHARGEMENT ---- */
(function launchConfetti() {
  const colors = ['#FF69B4', '#E8006E', '#ffffff', '#1A1A1A', '#87CEEB', '#FFB6C1'];

  function fire(particleRatio, opts) {
    confetti(Object.assign({}, {
      origin: { y: 0.55 },
      colors: colors,
      scalar: 1.1,
    }, opts, {
      particleCount: Math.floor(180 * particleRatio),
    }));
  }

  function burst() {
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2,  { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1,  { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1,  { spread: 120, startVelocity: 45 });
  }

  window.addEventListener('load', function () {
    setTimeout(burst, 400);
    setTimeout(burst, 1300);
  });
})();


/* ---- 2. COMPTE À REBOURS ---- */
(function initCountdown() {
  const targetDate = new Date('2026-06-21T15:00:00');

  const daysEl    = document.getElementById('days');
  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now  = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = '00';
      return;
    }

    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000)  / 60000);
    const seconds = Math.floor((diff % 60000)    / 1000);

    daysEl.textContent    = pad(days);
    hoursEl.textContent   = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  tick();
  setInterval(tick, 1000);
})();


/* ---- 3. SCROLL REVEAL (IntersectionObserver) ---- */
(function initReveal() {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();


/* ---- 4. BOUTON MUSIQUE ---- */
(function initMusic() {
  const btn   = document.getElementById('music-btn');
  const audio = document.getElementById('bg-music');
  let playing = false;

  btn.addEventListener('click', function () {
    if (playing) {
      audio.pause();
      btn.textContent = '🎵';
      btn.setAttribute('aria-label', 'Activer la musique');
    } else {
      audio.volume = 0.35;
      audio.play().catch(function () {});
      btn.textContent = '🔇';
      btn.setAttribute('aria-label', 'Désactiver la musique');
    }
    playing = !playing;
  });
})();


/* ---- 5. RSVP — Soumission AJAX ---- */
(function initRsvp() {
  const form       = document.getElementById('rsvp-form');
  const successDiv = document.getElementById('rsvp-success');
  const submitBtn  = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const submitLoad = document.getElementById('submit-loading');

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nameVal = document.getElementById('name').value.trim();
    if (!nameVal) {
      document.getElementById('name').focus();
      document.getElementById('name').style.borderColor = '#E8006E';
      return;
    }

    /* Show loading */
    submitBtn.disabled = true;
    submitText.style.display = 'none';
    submitLoad.style.display = 'inline';

    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        form.style.display = 'none';
        successDiv.style.display = 'block';
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        /* Extra confetti burst on success */
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#FF69B4', '#E8006E', '#ffffff', '#1A1A1A'],
        });
      } else {
        throw new Error('Server error');
      }
    } catch (_err) {
      submitBtn.disabled = false;
      submitText.style.display = 'inline';
      submitLoad.style.display = 'none';
      alert('Une erreur s\'est produite. Merci de réessayer ou de contacter directement les organisateurs.');
    }
  });

  /* Reset field error styling on input */
  document.getElementById('name').addEventListener('input', function () {
    this.style.borderColor = '';
  });
})();


/* ---- 6. SCROLL REVEAL GALERIE ---- */
(function initGalerieReveal() {
  const galerieCards = document.querySelectorAll('.galerie-card');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  galerieCards.forEach(function (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
})();


/* ---- 7. SMOOTH SCROLL pour le bouton "Ouvrir l'invitation" ---- */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
