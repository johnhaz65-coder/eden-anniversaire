/* =====================================================
   EDEN INVITATION — SCRIPT v2
   ===================================================== */

// ── Countdown ──
(function () {
  var target = new Date('2026-06-21T15:00:00');
  var els = {
    days:    document.getElementById('days'),
    hours:   document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
  };
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    var diff = Math.max(target.getTime() - Date.now(), 0);
    if (els.days)    els.days.textContent    = pad(Math.floor(diff / 86400000));
    if (els.hours)   els.hours.textContent   = pad(Math.floor((diff % 86400000) / 3600000));
    if (els.minutes) els.minutes.textContent = pad(Math.floor((diff % 3600000) / 60000));
    if (els.seconds) els.seconds.textContent = pad(Math.floor((diff % 60000) / 1000));
  }
  tick();
  setInterval(tick, 1000);
})();

// ── Boutons calendrier ──
(function () {
  var ev = {
    title:    '🎀 Minnie Pool Party - Eden 2 ans',
    start:    '20260621T130000Z',
    end:      '20260621T170000Z',
    location: '18 Avenue de la Côte d\'Azur, 13008 Marseille',
    desc:     'Eden fête ses 2 ans ! Pool Party à 15h00. Amenez votre maillot 💖',
  };

  var gcal = document.getElementById('btn-gcal');
  if (gcal) {
    gcal.href = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
      + '&text='     + encodeURIComponent(ev.title)
      + '&dates='    + ev.start + '/' + ev.end
      + '&details='  + encodeURIComponent(ev.desc)
      + '&location=' + encodeURIComponent(ev.location);
  }

  var outlook = document.getElementById('btn-outlook');
  if (outlook) {
    outlook.href = 'https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent'
      + '&subject='  + encodeURIComponent(ev.title)
      + '&startdt=2026-06-21T13:00:00Z'
      + '&enddt=2026-06-21T17:00:00Z'
      + '&body='     + encodeURIComponent(ev.desc)
      + '&location=' + encodeURIComponent(ev.location);
  }

  var ical = document.getElementById('btn-ical');
  if (ical) {
    ical.addEventListener('click', function () {
      var ics = [
        'BEGIN:VCALENDAR', 'VERSION:2.0', 'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        'DTSTART:' + ev.start,
        'DTEND:'   + ev.end,
        'SUMMARY:' + ev.title,
        'DESCRIPTION:' + ev.desc.replace(/\n/g, '\\n'),
        'LOCATION:' + ev.location.replace(/,/g, '\\,'),
        'BEGIN:VALARM', 'ACTION:DISPLAY', 'TRIGGER:-P3D',
        'DESCRIPTION:Rappel Pool Party Eden dans 3 jours !',
        'END:VALARM',
        'END:VEVENT', 'END:VCALENDAR',
      ].join('\r\n');
      var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      var url  = URL.createObjectURL(blob);
      var a    = document.createElement('a');
      a.href = url; a.download = 'eden-pool-party-2ans.ics';
      document.body.appendChild(a); a.click();
      document.body.removeChild(a); URL.revokeObjectURL(url);
    });
  }
})();

// ── Formulaire RSVP (Formspree mwvzgpnv) ──
(function () {
  var form      = document.getElementById('rsvp-form');
  var submitBtn = document.getElementById('submit-btn');
  var success   = document.getElementById('rsvp-success');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    submitBtn.disabled    = true;
    submitBtn.textContent = '⏳ Envoi en cours...';

    try {
      var res = await fetch(form.action, {
        method:  'POST',
        body:    new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error();
      form.hidden = true;
      if (success) success.hidden = false;
    } catch (_) {
      submitBtn.disabled    = false;
      submitBtn.textContent = '🎀 Confirmer ma présence';
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  });
})();

// ── Scroll reveal ──
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -20px 0px' });

  items.forEach(function (el) { observer.observe(el); });
})();

// ── Smooth scroll ancres ──
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
