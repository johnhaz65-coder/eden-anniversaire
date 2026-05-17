# 🎀 Invitation Anniversaire Eden — Minnie Pool Party

Site d'invitation pour les 2 ans d'Eden, thème Minnie Mouse Pool Party.

---

## Étapes avant déploiement

### 1. Ajouter la photo d'Eden

Copie ta photo dans `public/eden.jpg`.
Format recommandé : carré (ex. 400×400px), JPEG ou WebP.

### 2. Configurer Formspree (RSVP)

1. Va sur [formspree.io](https://formspree.io) → crée un compte gratuit
2. Clique **+ New Form**, donne-lui un nom (ex. "Eden Birthday RSVP")
3. Copie l'ID du formulaire (format `xxxxxxxx`)
4. Dans `public/index.html`, remplace :
   ```
   action="https://formspree.io/f/XXXXXXXX"
   ```
   par ton vrai ID, ex. :
   ```
   action="https://formspree.io/f/xpzgkrbn"
   ```
5. Dans Formspree → Settings, configure l'email de notification (le tien)

### 3. Ajouter la musique (optionnel)

Copie un fichier MP3 dans `public/music.mp3`.
Suggestions : berceuse douce, musique de dessin animé, etc.
Si absent, le bouton 🎵 reste visible mais ne joue rien.

### 4. Remplir l'adresse

Dans `public/index.html`, cherche `[Adresse à remplir]` et remplace par l'adresse réelle.

### 5. Mettre à jour l'URL OG (après déploiement)

Dans `public/index.html`, remplace `https://TON-SITE.pages.dev` par ton vrai domaine Cloudflare Pages.

---

## Déploiement sur Cloudflare Pages

### Option A — Via GitHub (recommandé)

```bash
git init
git add .
git commit -m "🎀 init Eden invitation"
```

1. Crée un repo sur github.com (public ou privé)
2. Push :
   ```bash
   git remote add origin https://github.com/TON-USERNAME/eden-invitation.git
   git push -u origin main
   ```
3. Va sur [dash.cloudflare.com](https://dash.cloudflare.com)
4. **Pages** → **Create a project** → **Connect to Git**
5. Sélectionne ton repo `eden-invitation`
6. Configuration du build :
   - **Framework preset** : None
   - **Build command** : *(laisser vide)*
   - **Build output directory** : `public`
7. Clique **Save and Deploy**
8. Ton site sera disponible sur `xxx.pages.dev` en ~1 minute

### Option B — Upload direct (sans GitHub)

1. Va sur [dash.cloudflare.com](https://dash.cloudflare.com) → Pages
2. **Create a project** → **Direct Upload**
3. Glisse-dépose le dossier `public/`
4. Déploie

---

## Domaine personnalisé (optionnel)

1. Dans Cloudflare Pages → ton projet → **Custom domains**
2. Ajoute ton domaine (ex. `eden.famille-machin.fr`)
3. Si le domaine est déjà sur Cloudflare, la config DNS est automatique

---

## Structure des fichiers

```
eden-invitation/
├── public/
│   ├── index.html     ← page principale
│   ├── style.css      ← tout le design
│   ├── script.js      ← countdown, confettis, RSVP AJAX
│   ├── eden.jpg       ← ta photo (à ajouter)
│   ├── og-image.jpg   ← aperçu WhatsApp (optionnel)
│   └── music.mp3      ← musique de fond (optionnel)
└── README.md
```

---

## Personnalisation rapide

| Ce que tu veux changer | Où le trouver |
|---|---|
| Date de l'événement | `index.html` + `script.js` ligne `targetDate` |
| Adresse | `index.html` → `[Adresse à remplir]` |
| Couleurs | `style.css` → variables `:root` |
| Deadline RSVP | `index.html` → "Avant le 1er Juin 2026" |
| Photo | `public/eden.jpg` |

---

## Support

Pas de dépendances npm — tout fonctionne en ouvrant `public/index.html` dans un navigateur.
