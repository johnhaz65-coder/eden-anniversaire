/* =====================================================
   EDEN INVITATION — MINNIE POOL PARTY — SCRIPT
   ===================================================== */

// ══ CONFIG ══
// Remplacez XXXXXXXX par votre ID Formspree (formspree.io)
var CONFIG = {
  FORMSPREE_ID: "XXXXXXXX",
  ADMIN_PASSWORD: "Eden2026",
  EVENT: {
    title:    "🎀 Minnie Pool Party - Eden 2 ans",
    start:    "20260621T130000Z",   // 15h00 Paris = 13h00 UTC
    end:      "20260621T170000Z",   // 19h00 Paris = 17h00 UTC
    location: "18 Avenue de la Côte d'Azur, 13008 Marseille",
    description: "Eden fête ses 2 ans ! Pool Party à 15h00. Amenez votre maillot de bain 💖",
  }
};

// ══ CONFETTI AU CHARGEMENT ══
(function launchConfetti() {
  if (typeof confetti !== "function") return;
  window.addEventListener("load", function () {
    window.setTimeout(function () {
      var colors = ["#FFD700","#FF69B4","#E8006E","#FFC0CB","#ffffff","#FFB6C1","#FF1493"];
      confetti({ particleCount:90, spread:80, startVelocity:38, origin:{x:0.25,y:0.28}, colors:colors, scalar:1.1 });
      window.setTimeout(function () {
        confetti({ particleCount:90, spread:80, startVelocity:38, origin:{x:0.75,y:0.28}, colors:colors, scalar:1.1 });
      }, 320);
      window.setTimeout(function () {
        confetti({ particleCount:70, spread:130, startVelocity:22, origin:{x:0.5,y:0}, colors:colors, scalar:0.9 });
      }, 750);
      window.setTimeout(function () {
        confetti({ particleCount:45, spread:60, startVelocity:30, origin:{x:0.5,y:0.35}, colors:colors, shapes:["circle"], scalar:0.75 });
      }, 1400);
    }, 500);
  });
})();

// ══ DÉCOR DYNAMIQUE ══
(function createDecor() {
  var layer = document.getElementById("deco-layer");
  if (!layer) return;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var small = window.innerWidth < 640;

  if (!reduced) {
    var petalColors = ["#FF69B4","#FFB6C1","#FFC0CB","#E8006E","#FF1493"];
    var pc = small ? 10 : 20;
    for (var i = 0; i < pc; i++) {
      var p = document.createElement("div");
      p.className = "petal";
      var sz = 9 + Math.random() * 8;
      p.style.cssText = "left:"+Math.random()*100+"vw;width:"+sz+"px;height:"+(sz*1.3)+"px;background:"+petalColors[i%5]+";opacity:"+(0.5+Math.random()*0.45)+";border-radius:"+(i%2?"50% 0 50% 0":"0 50% 0 50%")+";animation-duration:"+(8+Math.random()*10)+"s;animation-delay:"+(-(Math.random()*14))+"s;";
      layer.appendChild(p);
    }
    var bc = small ? 7 : 14;
    for (var j = 0; j < bc; j++) {
      var b = document.createElement("div");
      b.className = "bubble";
      var bs = 14 + Math.random() * 32;
      b.style.cssText = "left:"+Math.random()*96+"vw;width:"+bs+"px;height:"+bs+"px;animation-duration:"+(12+Math.random()*14)+"s;animation-delay:"+(-(Math.random()*18))+"s;";
      layer.appendChild(b);
    }
  }

  var sc = reduced ? 5 : (small ? 8 : 16);
  for (var k = 0; k < sc; k++) {
    var s = document.createElement("div");
    s.className = "star";
    var ss = 4 + Math.random() * 7;
    s.style.cssText = "left:"+(4+Math.random()*92)+"vw;top:"+(5+Math.random()*85)+"vh;width:"+ss+"px;height:"+ss+"px;animation-duration:"+(1.2+Math.random()*2.5)+"s;animation-delay:"+(-(Math.random()*3))+"s;";
    layer.appendChild(s);
  }

  var hearts = ["💕","💗","💖","💓","🩷"];
  var hc = reduced ? 0 : (small ? 8 : 16);
  for (var h = 0; h < hc; h++) {
    var el = document.createElement("span");
    el.className = "heart";
    el.textContent = hearts[h % hearts.length];
    el.style.cssText = "left:"+Math.random()*90+"vw;bottom:"+Math.random()*30+"vh;font-size:"+(0.7+Math.random()*0.9)+"rem;animation-duration:"+(11+Math.random()*14)+"s;animation-delay:"+(-(Math.random()*14))+"s;";
    layer.appendChild(el);
  }
})();

// ══ CALENDRIER & RAPPEL ══
(function initCalendar() {
  var ev = CONFIG.EVENT;

  // Google Calendar
  var gcalBtn = document.getElementById("btn-gcal");
  if (gcalBtn) {
    gcalBtn.href = "https://calendar.google.com/calendar/render?action=TEMPLATE"
      + "&text=" + encodeURIComponent(ev.title)
      + "&dates=" + ev.start + "/" + ev.end
      + "&details=" + encodeURIComponent(ev.description)
      + "&location=" + encodeURIComponent(ev.location);
  }

  // Outlook
  var outlookBtn = document.getElementById("btn-outlook");
  if (outlookBtn) {
    outlookBtn.href = "https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent"
      + "&subject=" + encodeURIComponent(ev.title)
      + "&startdt=2026-06-21T13:00:00Z"
      + "&enddt=2026-06-21T17:00:00Z"
      + "&body=" + encodeURIComponent(ev.description)
      + "&location=" + encodeURIComponent(ev.location);
  }

  // Apple / iPhone (.ics download)
  var icalBtn = document.getElementById("btn-ical");
  if (icalBtn) {
    icalBtn.addEventListener("click", function () {
      var ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "CALSCALE:GREGORIAN",
        "PRODID:-//Eden Pool Party 2026//FR",
        "BEGIN:VEVENT",
        "DTSTART:" + ev.start,
        "DTEND:" + ev.end,
        "SUMMARY:" + ev.title,
        "DESCRIPTION:" + ev.description.replace(/\n/g, "\\n"),
        "LOCATION:" + ev.location.replace(/,/g, "\\,"),
        "BEGIN:VALARM",
        "ACTION:DISPLAY",
        "TRIGGER:-P3D",
        "DESCRIPTION:Rappel : Pool Party Eden dans 3 jours !",
        "END:VALARM",
        "BEGIN:VALARM",
        "ACTION:DISPLAY",
        "TRIGGER:-PT2H",
        "DESCRIPTION:Aujourd'hui ! Pool Party Eden à 15h00 💖",
        "END:VALARM",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      var blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "eden-pool-party-2ans.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // Rappel via Notification API
  var remindBtn = document.getElementById("btn-remind");
  var remindText = document.getElementById("remind-text");
  var remindNote = document.getElementById("remind-note");

  if (remindBtn) {
    // Restore state
    if (localStorage.getItem("eden_reminder") === "true") {
      remindBtn.classList.add("actif");
      if (remindText) remindText.textContent = "✅ Rappel activé !";
      if (remindNote) remindNote.textContent = "Vous serez notifié(e) avant la fête.";
    }

    remindBtn.addEventListener("click", function () {
      if (!("Notification" in window)) {
        if (remindNote) remindNote.textContent = "Ajoutez l'événement au calendrier pour un rappel.";
        return;
      }
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          // Notification immédiate de confirmation
          new Notification("🎀 Rappel Eden Pool Party activé !", {
            body: "21 Juin 2026 · 15H00 · 18 Av. de la Côte d'Azur, Marseille\nOn vous attend ! 💖",
            tag: "eden-pool-party"
          });
          localStorage.setItem("eden_reminder", "true");
          remindBtn.classList.add("actif");
          if (remindText) remindText.textContent = "✅ Rappel activé !";
          if (remindNote) remindNote.textContent = "Notification confirmée. Ajoutez aussi au calendrier pour un rappel automatique.";
        } else if (permission === "denied") {
          if (remindNote) remindNote.textContent = "Notifications bloquées. Ajoutez l'événement au calendrier à la place.";
        }
      });
    });
  }
})();

// ══ COUNTDOWN ══
(function initCountdown() {
  var target = new Date("2026-06-21T15:00:00");
  var dEl = document.getElementById("days");
  var hEl = document.getElementById("hours");
  var mEl = document.getElementById("minutes");
  var sEl = document.getElementById("seconds");
  function pad(v) { return String(v).padStart(2, "0"); }
  function tick() {
    var diff = Math.max(target.getTime() - Date.now(), 0);
    if (dEl) dEl.textContent = pad(Math.floor(diff / 86400000));
    if (hEl) hEl.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    if (mEl) mEl.textContent = pad(Math.floor((diff % 3600000) / 60000));
    if (sEl) sEl.textContent = pad(Math.floor((diff % 60000) / 1000));
  }
  tick();
  setInterval(tick, 1000);
})();

// ══ SCROLL REVEAL ══
(function initReveal() {
  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("visible"); });
    return;
  }
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -30px" }
  );
  items.forEach(function (el) { observer.observe(el); });
})();

// ══ MUSIQUE ══
(function initMusic() {
  var btn = document.getElementById("music-btn");
  var audio = document.getElementById("bg-music");
  if (!btn || !audio) return;
  btn.addEventListener("click", function () {
    if (audio.paused) {
      audio.volume = 0.28;
      audio.play().then(function () {
        btn.textContent = "⏸";
        btn.setAttribute("aria-label", "Désactiver la musique");
      }).catch(function () {});
    } else {
      audio.pause();
      btn.textContent = "🎵";
      btn.setAttribute("aria-label", "Activer la musique");
    }
  });
})();

// ══ RSVP — envoi Formspree ajax ══
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Envoi en cours...';
    btn.disabled = true;

    try {
      const res = await fetch('https://formspree.io/f/mwvzgpnv', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.innerHTML = '<div style="text-align:center;padding:40px;font-family:Pacifico,cursive;color:#E8006E;font-size:1.5rem;line-height:2">🎀<br>Merci !<br>On t\'attend le 21 Juin !<br>🎀</div>';
        if (typeof confetti === "function") {
          confetti({ particleCount:130, spread:90, startVelocity:34, origin:{y:0.6},
            colors:["#FFD700","#FF69B4","#E8006E","#FFC0CB","#ffffff"] });
        }
      } else {
        const data = await res.json();
        btn.innerHTML = originalText;
        btn.disabled = false;
        alert('Erreur : ' + (data.error || 'Réessayez'));
      }
    } catch(err) {
      btn.innerHTML = originalText;
      btn.disabled = false;
      alert('Erreur réseau, réessayez');
    }
  });
});

// ══ SMOOTH SCROLL ══
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (e) {
    var target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
