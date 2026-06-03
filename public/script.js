var CONFIG = {
  EVENT: {
    title: "Minnie Pool Party - Eden 2 ans",
    start: "20260621T130000Z",
    end: "20260621T170000Z",
    location: "18 Avenue de la Côte d'Azur, 13008 Marseille",
    description: "Eden fête ses 2 ans ! Pool Party à 15h00. Amenez votre maillot de bain.",
  }
};

(function initCalendar() {
  var ev = CONFIG.EVENT;

  var gcalBtn = document.getElementById("btn-gcal");
  if (gcalBtn) {
    gcalBtn.href = "https://calendar.google.com/calendar/render?action=TEMPLATE"
      + "&text=" + encodeURIComponent(ev.title)
      + "&dates=" + ev.start + "/" + ev.end
      + "&details=" + encodeURIComponent(ev.description)
      + "&location=" + encodeURIComponent(ev.location);
  }

  var outlookBtn = document.getElementById("btn-outlook");
  if (outlookBtn) {
    outlookBtn.href = "https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent"
      + "&subject=" + encodeURIComponent(ev.title)
      + "&startdt=2026-06-21T13:00:00Z"
      + "&enddt=2026-06-21T17:00:00Z"
      + "&body=" + encodeURIComponent(ev.description)
      + "&location=" + encodeURIComponent(ev.location);
  }

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
        "DESCRIPTION:Rappel : Pool Party Eden dans 3 jours",
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

  var remindBtn = document.getElementById("btn-remind");
  var remindText = document.getElementById("remind-text");
  var remindNote = document.getElementById("remind-note");
  if (!remindBtn) return;

  if (localStorage.getItem("eden_reminder") === "true") {
    remindBtn.classList.add("actif");
    if (remindText) remindText.textContent = "Rappel activé";
    if (remindNote) remindNote.textContent = "Le rappel est mémorisé sur cet appareil.";
  }

  remindBtn.addEventListener("click", function () {
    localStorage.setItem("eden_reminder", "true");
    remindBtn.classList.add("actif");
    if (remindText) remindText.textContent = "Rappel activé";
    if (remindNote) remindNote.textContent = "Ajoutez aussi l'événement au calendrier pour recevoir l'alerte iPhone.";
  });
})();

(function initCountdown() {
  var target = new Date("2026-06-21T15:00:00");
  var dEl = document.getElementById("days");
  var hEl = document.getElementById("hours");
  var mEl = document.getElementById("minutes");
  var sEl = document.getElementById("seconds");

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function tick() {
    var diff = Math.max(target.getTime() - Date.now(), 0);
    if (dEl) dEl.textContent = pad(Math.floor(diff / 86400000));
    if (hEl) hEl.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    if (mEl) mEl.textContent = pad(Math.floor((diff % 3600000) / 60000));
    if (sEl) sEl.textContent = pad(Math.floor((diff % 60000) / 1000));
  }

  tick();
  window.setInterval(tick, 1000);
})();

(function initReveal() {
  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (item) { item.classList.add("visible"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -24px" });

  items.forEach(function (item) { observer.observe(item); });
})();

(function initMusic() {
  var btn = document.getElementById("music-btn");
  var audio = document.getElementById("bg-music");
  if (!btn || !audio) return;

  btn.addEventListener("click", function () {
    if (audio.paused) {
      audio.volume = 0.28;
      audio.play().then(function () {
        btn.textContent = "Ⅱ";
        btn.setAttribute("aria-label", "Désactiver la musique");
      }).catch(function () {
        btn.textContent = "♪";
      });
    } else {
      audio.pause();
      btn.textContent = "♪";
      btn.setAttribute("aria-label", "Activer la musique");
    }
  });
})();

(function initRsvp() {
  var form = document.getElementById("rsvp-form");
  var success = document.getElementById("rsvp-success");
  var submitBtn = document.getElementById("submit-btn");
  var submitText = document.getElementById("submit-text");
  var submitLoading = document.getElementById("submit-loading");
  var nameInput = document.getElementById("name");
  var status = document.getElementById("form-status");
  if (!form || !submitBtn || !nameInput) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (status) {
      status.textContent = "";
      status.className = "form-status";
    }

    if (!nameInput.value.trim()) {
      if (status) {
        status.textContent = "Merci d'indiquer votre prénom et nom.";
        status.className = "form-status is-error";
      }
      nameInput.focus();
      return;
    }

    var presenceChecked = form.querySelector('input[name="presence"]:checked');
    if (!presenceChecked) {
      if (status) {
        status.textContent = "Merci d'indiquer si vous serez présent.";
        status.className = "form-status is-error";
      }
      var firstPresence = form.querySelector('input[name="presence"]');
      if (firstPresence) firstPresence.focus();
      return;
    }

    submitBtn.disabled = true;
    if (submitText) submitText.hidden = true;
    if (submitLoading) submitLoading.hidden = false;

    var formData = new FormData(form);
    var rsvpData = {
      date: new Date().toISOString(),
      name: formData.get("name") || "",
      phone: formData.get("phone") || "",
      email: formData.get("email") || "",
      presence: formData.get("presence") || "",
      adultes: formData.get("adultes") || "",
      enfants: formData.get("enfants") || "",
      message: formData.get("message") || ""
    };

    try {
      var stored = JSON.parse(localStorage.getItem("eden_rsvps") || "[]");
      stored.push(rsvpData);
      localStorage.setItem("eden_rsvps", JSON.stringify(stored));
    } catch (_) {}

    try {
      var response = await fetch("https://formspree.io/f/mwvzgpnv", {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });
      if (!response.ok) throw new Error("Formspree error");
    } catch (_) {
      submitBtn.disabled = false;
      if (submitText) submitText.hidden = false;
      if (submitLoading) submitLoading.hidden = true;
      if (status) {
        status.textContent = "Erreur d’envoi. Vérifiez votre connexion puis réessayez.";
        status.className = "form-status is-error";
      }
      return;
    }

    form.hidden = true;
    if (success) {
      var title = success.querySelector("h3");
      if (title) title.textContent = "Merci, votre réponse a bien été envoyée 🎀";
      success.hidden = false;
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
})();

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (event) {
    var target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
