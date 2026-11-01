# Atelier Nova — Catalogue

Site statique (HTML / CSS / JS), sans dépendance, prêt pour GitHub Pages.

## Structure
```
index.html     page principale
style.css      mise en page (utilise les couleurs de theme.js)
theme.js       ⭐ VOS PALETTES DE COULEURS (17 thèmes)
products.js    infos boutique, produits, vidéo, avis d'exemple
app.js         catalogue, panier, commande, avis, lecteur vidéo
assets/        logo.svg (+ mettez ici video.mp4 si vous voulez)
```

## Changer les couleurs (vous seul)
Aucun bouton n'est visible pour les visiteurs. Ouvrez `theme.js` et changez :
```js
const ACTIVE_THEME = "neonSunset";
```
Thèmes : neonSunset, tropical, cyberpunk, candyPop, oceanDeep, royalGold, aurora, lavaFire,
electricViolet, mintFresh, peachy, rainbow, emerald, sakura, midnightBlue, miami, custom.

Seules les personnes ayant les droits d'écriture sur votre dépôt GitHub peuvent modifier ce fichier.

## Changer la vidéo
Dans `products.js` :
```js
const VIDEO = { type: "file", src: "assets/video.mp4" };     // fichier MP4
const VIDEO = { type: "youtube", src: "ID_YOUTUBE" };        // YouTube
const VIDEO = { type: "vimeo", src: "123456789" };           // Vimeo
```
Conseil : MP4 encodé en H.264 + AAC, moins de 100 Mo (limite GitHub).
Raccourcis : Espace/K lecture, ←/→ ±5 s, M muet, F plein écran.

## Mettre en ligne sur GitHub Pages
1. Créez un dépôt sur github.com et envoyez ces fichiers :
   ```bash
   git init && git add . && git commit -m "Premier envoi"
   git branch -M main
   git remote add origin https://github.com/VOTRE-NOM/VOTRE-DEPOT.git
   git push -u origin main
   ```
2. Settings → Pages → Source : `main` / `root` → Save.

## Avant publication
Complétez les mentions légales, CGV et la politique de confidentialité.
La commande est une démonstration (envoi par e-mail, sans paiement).
