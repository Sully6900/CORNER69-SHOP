/* =========================================================
   PRODUCTS.JS — vos infos, produits, vidéo et avis
   ========================================================= */

const SHOP = {
  name: "LA BOUTIQUE DU CORNER",
  contact: "contact@exemple.fr",
  whatsapp: "+33 0 00 00 00 00",
  address: "Adresse à compléter",
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
  title: "Découvrez notre atelier"
};

const CATEGORIES = ["Décoration", "Accessoires", "Papeterie"];

const PRODUCTS = [
  { id: 1, name: "Vase Aurore",       category: "Décoration",  price: 39.90, featured: 3, emoji: "🏺", desc: "Céramique artisanale, finition émaillée." },
  { id: 2, name: "Bougie Solaire",    category: "Décoration",  price: 18.50, featured: 5, emoji: "🕯️", desc: "Cire végétale, parfum agrumes." },
  { id: 3, name: "Tote bag Néon",     category: "Accessoires", price: 22.00, featured: 4, emoji: "👜", desc: "Coton bio, sérigraphie fluo." },
  { id: 4, name: "Carnet Prisme",     category: "Papeterie",   price: 12.90, featured: 2, emoji: "📓", desc: "Papier 120 g, couverture irisée." },
  { id: 5, name: "Bracelet Lumière",  category: "Accessoires", price: 29.00, featured: 1, emoji: "📿", desc: "Perles de verre colorées." },
  { id: 6, name: "Affiche Cosmos",    category: "Papeterie",   price: 24.00, featured: 6, emoji: "🖼️", desc: "Impression A3 haute qualité." }
];

const SAMPLE_REVIEWS = [
  { name: "Exemple A", rating: 5, text: "Avis d'exemple — remplacez par un avis authentique.", sample: true },
  { name: "Exemple B", rating: 4, text: "Avis d'exemple — remplacez par un avis authentique.", sample: true }
];
