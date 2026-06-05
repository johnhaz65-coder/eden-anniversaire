'use strict';

/* ═══════════════════════════════════════════════════════
   COUNTDOWN — cible : 21 Juin 2026 à 15H00 (Marseille = UTC+2)
═══════════════════════════════════════════════════════ */
(function initCountdown() {
  const target = new Date('2026-06-21T15:00:00+02:00').getTime();
  const els = {
    days:    document.getElementById('days'),
    hours:   document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
  };

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const diff = target - Date.now();

    if (diff <= 0) {
      Object.values(els).forEach(el => { if (el) el.textContent = '00'; });
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    if (els.days)    els.days.textContent    = pad(d);
    if (els.hours)   els.hours.textContent   = pad(h);
    if (els.minutes) els.minutes.textContent = pad(m);
    if (els.seconds) els.seconds.textContent = pad(s);
  }

  tick();
  setInterval(tick, 1000);
})();

/* ═══════════════════════════════════════════════════════
   COUNTERS — adultes / enfants
═══════════════════════════════════════════════════════ */
const counts = { adults: 0, children: 0 };

document.querySelectorAll('.cnt-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const field = btn.dataset.field;
    const dir   = parseInt(btn.dataset.dir, 10);
    counts[field] = Math.max(0, counts[field] + dir);
    const el = document.getElementById(field + '-val');
    if (el) el.textContent = counts[field];
  });
});

/* ═══════════════════════════════════════════════════════
   RSVP — Fetch POST → Formspree (Accept: application/json)
═══════════════════════════════════════════════════════ */
const form      = document.getElementById('rsvp-form');
const submitBtn = document.getElementById('submit-btn');
const successEl = document.getElementById('form-success');
const errorEl   = document.getElementById('form-error');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameVal  = document.getElementById('name').value.trim();
    const emailVal = document.getElementById('email').value.trim();

    if (!nameVal || !emailVal) {
      if (!nameVal) document.getElementById('name').focus();
      else document.getElementById('email').focus();
      return;
    }

    const payload = {
      name:     nameVal,
      phone:    document.getElementById('phone').value.trim(),
      email:    emailVal,
      adults:   counts.adults,
      children: counts.children,
      message:  document.getElementById('message').value.trim(),
      event:    'Pool Party + Goûter · Dimanche 21 Juin 2026 · 15H00',
      address:  '18 Avenue de la Côte d\'Azur · 13008 Marseille',
      _subject: 'RSVP Anniversaire Eden – Minnie Pool Party',
      _cc:      'elisa_024@hotmail.fr',
    };

    submitBtn.disabled    = true;
    submitBtn.textContent = '⏳ Envoi en cours...';
    errorEl.classList.remove('visible');

    try {
      const res = await fetch('https://formspree.io/f/mwvzgpnv', {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept':       'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        form.reset();
        counts.adults   = 0;
        counts.children = 0;
        const avEl = document.getElementById('adults-val');
        const cvEl = document.getElementById('children-val');
        if (avEl) avEl.textContent = '0';
        if (cvEl) cvEl.textContent = '0';

        submitBtn.style.display = 'none';
        successEl.classList.add('visible');
        fireConfetti();
      } else {
        throw new Error('Non-OK response');
      }
    } catch {
      errorEl.classList.add('visible');
      submitBtn.disabled    = false;
      submitBtn.textContent = '🎀 CONFIRMER MA PRÉSENCE';
    }
  });
}

/* ═══════════════════════════════════════════════════════
   CONFETTI
═══════════════════════════════════════════════════════ */
function fireConfetti() {
  if (typeof confetti !== 'function') return;
  const colors = ['#E8006E', '#FF69B4', '#FFFFFF', '#C0005A', '#FFB6D9'];
  confetti({ particleCount: 120, spread: 75, origin: { y: 0.65 }, colors });
  setTimeout(() => confetti({ particleCount: 80, spread: 110, origin: { x: 0.15, y: 0.6 }, colors }), 400);
  setTimeout(() => confetti({ particleCount: 80, spread: 110, origin: { x: 0.85, y: 0.6 }, colors }), 700);
}

window.addEventListener('load', () => {
  if (typeof confetti !== 'function') return;
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 68,
      origin: { y: 0.38 },
      colors: ['#E8006E', '#FF69B4', '#FFF0F5', '#C0005A', '#FFB6D9'],
    });
  }, 900);
});

/* ═══════════════════════════════════════════════════════
   INTERSECTIONOBSERVER — reveal au scroll
═══════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
