/* =========================================================
   PRODUCTS.JS — vos infos, produits, vidéo et avis
   ========================================================= */

const SHOP = {
  name: "Corner69 Shop",
  currency: "EUR"
};

/* VIDÉO
   - type "file"    : fichier MP4/WebM (dans assets/ ou une URL directe)
   - type "youtube" : collez l'ID de la vidéo (ex: "dQw4w9WgXcQ")
   - type "vimeo"   : collez l'ID numérique Vimeo                      */
const VIDEO = {
  type: "file",
  src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  fallback: "assets/video.mp4",        // utilisé si src ne charge pas
  poster: "",
  title: "Découvrez notre menu"
};

const CATEGORIES = ["🧽 Mousse", "🍫 Choco", "Papeterie"];

const PRODUCTS = [
  { id: 1, name: "🧽 Mousse",       category: "🧽 Mousse",  price: 39.90, featured: 3, emoji: "🏺", desc: "Céramique artisanale, finition émaillée." },
  { id: 2, name: "🍫 Choco",    category: "🍫 Choco",  price: 18.50, featured: 5, emoji: "🕯️", desc: "Cire végétale, parfum agrumes." },
  { id: 3, name: "🍀 Weed",     category: "Accessoires", price: 22.00, featured: 4, emoji: "👜", desc: "Coton bio, sérigraphie fluo." },
  { id: 4, name: "❄️ Neige",     category: "Papeterie",   price: 12.90, featured: 2, emoji: "📓", desc: "Papier 120 g, couverture irisée." },
  { id: 5, name: "🤯 Synthèse",  category: "Accessoires", price: 29.00, featured: 1, emoji: "📿", desc: "Perles de verre colorées." },
  ];

const SAMPLE_REVIEWS = [
  { name: "Exemple A", rating: 5, text: "Avis d'exemple — remplacez par un avis authentique.", sample: true },
  { name: "Exemple B", rating: 4, text: "Avis d'exemple — remplacez par un avis authentique.", sample: true }
];
