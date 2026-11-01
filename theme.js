/* =========================================================
   THEME.JS — VOS COULEURS (vous seul pouvez les changer)
   ---------------------------------------------------------
   Les visiteurs n'ont AUCUN bouton pour changer les couleurs.
   Pour changer : modifiez ACTIVE_THEME ci-dessous, enregistrez,
   puis poussez sur GitHub (git commit + git push).
   ========================================================= */

const ACTIVE_THEME = "neonSunset"; // <-- changez ce nom

const THEMES = {
  neonSunset:   { bg:"#12061f", surface:"#1f0b33", text:"#fff4fb", muted:"#c9a8d9", primary:"#ff2e88", secondary:"#ffb400", accent:"#00e5ff", gradient:"linear-gradient(135deg,#ff2e88 0%,#ff7a00 50%,#ffd000 100%)" },
  tropical:     { bg:"#03201f", surface:"#073833", text:"#f0fffb", muted:"#9fd8cc", primary:"#00f5a0", secondary:"#ff6b6b", accent:"#ffe66d", gradient:"linear-gradient(135deg,#00f5a0,#00d9f5,#ffe66d)" },
  cyberpunk:    { bg:"#0a0a12", surface:"#16162a", text:"#f5f5ff", muted:"#a0a0c8", primary:"#fcee0a", secondary:"#ff003c", accent:"#00f0ff", gradient:"linear-gradient(135deg,#fcee0a,#ff003c,#00f0ff)" },
  candyPop:     { bg:"#fff0f8", surface:"#ffffff", text:"#3a0a2e", muted:"#8a5a7e", primary:"#ff3ea5", secondary:"#7b2ff7", accent:"#00c2ff", gradient:"linear-gradient(135deg,#ff3ea5,#ff9a3e,#7b2ff7)" },
  oceanDeep:    { bg:"#020c1b", surface:"#0a1f3a", text:"#e6f4ff", muted:"#8fb3d9", primary:"#00b4ff", secondary:"#7af0ff", accent:"#ff8a00", gradient:"linear-gradient(135deg,#0052d4,#4364f7,#6fb1fc)" },
  royalGold:    { bg:"#140f05", surface:"#251c0b", text:"#fff8e7", muted:"#d6c49a", primary:"#ffc947", secondary:"#b8860b", accent:"#ff4d6d", gradient:"linear-gradient(135deg,#f7971e,#ffd200,#fff1a8)" },
  aurora:       { bg:"#050816", surface:"#111735", text:"#f2f6ff", muted:"#a6b0d6", primary:"#7cff6b", secondary:"#b06bff", accent:"#ff6bd6", gradient:"linear-gradient(135deg,#7cff6b,#00e1ff,#b06bff,#ff6bd6)" },
  lavaFire:     { bg:"#1a0500", surface:"#2e0c02", text:"#fff3ec", muted:"#e0a990", primary:"#ff4500", secondary:"#ffae00", accent:"#ffe14d", gradient:"linear-gradient(135deg,#8e0e00,#ff4500,#ffae00)" },
  electricViolet:{ bg:"#0d0221", surface:"#1b0a3d", text:"#f6efff", muted:"#b8a3e0", primary:"#9d4edd", secondary:"#f72585", accent:"#4cc9f0", gradient:"linear-gradient(135deg,#f72585,#7209b7,#4cc9f0)" },
  mintFresh:    { bg:"#f2fffa", surface:"#ffffff", text:"#0b3b2e", muted:"#5f8a7c", primary:"#00c896", secondary:"#ff7aa2", accent:"#ffb800", gradient:"linear-gradient(135deg,#00c896,#7af5c6,#ffe27a)" },
  peachy:       { bg:"#fff6f0", surface:"#ffffff", text:"#3d1d10", muted:"#9a6a55", primary:"#ff7e5f", secondary:"#feb47b", accent:"#6a5cff", gradient:"linear-gradient(135deg,#ff7e5f,#feb47b,#ffd6a5)" },
  rainbow:      { bg:"#0b0b0f", surface:"#18181f", text:"#ffffff", muted:"#b5b5c5", primary:"#ff0080", secondary:"#7928ca", accent:"#00dfd8", gradient:"linear-gradient(90deg,#ff0000,#ff8000,#ffee00,#00d03a,#00a8ff,#7a00ff,#ff00c8)" },
  emerald:      { bg:"#021a10", surface:"#06301e", text:"#eafff4", muted:"#93cfb0", primary:"#00e676", secondary:"#ffd740", accent:"#40c4ff", gradient:"linear-gradient(135deg,#00b09b,#96c93d)" },
  sakura:       { bg:"#fff5f8", surface:"#ffffff", text:"#401426", muted:"#a06a80", primary:"#ff5c8a", secondary:"#ffa6c1", accent:"#3ec1d3", gradient:"linear-gradient(135deg,#ff5c8a,#ffa6c1,#ffd1dc)" },
  midnightBlue: { bg:"#000814", surface:"#001d3d", text:"#eaf2ff", muted:"#8aa4c8", primary:"#ffc300", secondary:"#ffd60a", accent:"#4ea8de", gradient:"linear-gradient(135deg,#003566,#ffc300)" },
  miami:        { bg:"#170026", surface:"#2b0145", text:"#fff0ff", muted:"#d8a6e6", primary:"#ff3cac", secondary:"#2b86c5", accent:"#00fff0", gradient:"linear-gradient(135deg,#ff3cac,#784ba0,#2b86c5)" },

  /* Votre propre palette : remplissez puis mettez ACTIVE_THEME = "custom" */
  custom:       { bg:"#101010", surface:"#1c1c1c", text:"#ffffff", muted:"#aaaaaa", primary:"#ff00aa", secondary:"#00ffaa", accent:"#ffaa00", gradient:"linear-gradient(135deg,#ff00aa,#00ffaa)" }
};

(function applyTheme(){
  const t = THEMES[ACTIVE_THEME] || THEMES.neonSunset;
  const r = document.documentElement.style;
  Object.entries(t).forEach(([k,v]) => r.setProperty("--" + k, v));
})();
