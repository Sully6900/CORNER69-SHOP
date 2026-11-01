(() => {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const fmt = n => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " " + SHOP.currency;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
  const toast = msg => { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("show"), 2200); };

  /* ---------- Infos boutique ---------- */
  $("#shopName").textContent = SHOP.name;
  $("#email").textContent = SHOP.email; $("#email").href = "mailto:" + SHOP.email;
  $("#phone").textContent = SHOP.phone;
  $("#address").textContent = SHOP.address;
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Lecteur vidéo ---------- */
  function buildPlayer() {
    const box = $("#player");
    $("#videoTitle").textContent = VIDEO.title || "Vidéo";

    if (VIDEO.type === "youtube" || VIDEO.type === "vimeo") {
      const url = VIDEO.type === "youtube"
        ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(VIDEO.src)}?rel=0`
        : `https://player.vimeo.com/video/${encodeURIComponent(VIDEO.src)}`;
      box.innerHTML = `<iframe src="${url}" title="${esc(VIDEO.title)}" loading="lazy"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
      return;
    }

    box.innerHTML = `
      <video playsinline preload="metadata" ${VIDEO.poster ? `poster="${esc(VIDEO.poster)}"` : ""}></video>
      <button class="vp-big" aria-label="Lecture">▶</button>
      <div class="vp-controls">
        <button class="vp-play" aria-label="Lecture/Pause">▶</button>
        <span class="vp-time">0:00 / 0:00</span>
        <input class="vp-progress" type="range" min="0" max="1000" value="0" aria-label="Progression" />
        <button class="vp-mute" aria-label="Son">🔊</button>
        <input class="vp-volume" type="range" min="0" max="1" step="0.05" value="1" aria-label="Volume" />
        <button class="vp-speed" aria-label="Vitesse">1x</button>
        <button class="vp-pip" aria-label="Image dans l'image">⧉</button>
        <button class="vp-full" aria-label="Plein écran">⛶</button>
      </div>`;

    const v = $("video", box), playBtn = $(".vp-play", box), big = $(".vp-big", box);
    const prog = $(".vp-progress", box), time = $(".vp-time", box);
    const mute = $(".vp-mute", box), vol = $(".vp-volume", box), speed = $(".vp-speed", box);
    const sources = [VIDEO.src, VIDEO.fallback].filter(Boolean);
    let idx = 0, idleT;

    const load = () => { v.src = sources[idx]; v.load(); };
    v.addEventListener("error", () => {
      if (++idx < sources.length) return load();
      box.insertAdjacentHTML("beforeend", `<div class="vp-error">⚠️ Vidéo introuvable.<br>Vérifiez VIDEO.src dans products.js.</div>`);
    });
    load();

    const t = s => isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00";
    const toggle = () => v.paused ? v.play().catch(() => toast("Lecture bloquée, réessayez")) : v.pause();

    [playBtn, big].forEach(b => b.addEventListener("click", toggle));
    v.addEventListener("click", toggle);
    v.addEventListener("play", () => { box.classList.add("playing"); playBtn.textContent = "❚❚"; });
    v.addEventListener("pause", () => { box.classList.remove("playing"); playBtn.textContent = "▶"; });
    v.addEventListener("ended", () => { box.classList.remove("playing"); playBtn.textContent = "↻"; });
    v.addEventListener("timeupdate", () => {
      if (v.duration) prog.value = (v.currentTime / v.duration) * 1000;
      time.textContent = `${t(v.currentTime)} / ${t(v.duration)}`;
    });
    v.addEventListener("loadedmetadata", () => time.textContent = `0:00 / ${t(v.duration)}`);
    prog.addEventListener("input", () => { if (v.duration) v.currentTime = (prog.value / 1000) * v.duration; });

    vol.addEventListener("input", () => { v.volume = +vol.value; v.muted = v.volume === 0; });
    mute.addEventListener("click", () => { v.muted = !v.muted; });
    v.addEventListener("volumechange", () => { mute.textContent = v.muted || v.volume === 0 ? "🔇" : "🔊"; });

    const rates = [1, 1.25, 1.5, 2, 0.5, 0.75];
    speed.addEventListener("click", () => { const r = rates[(rates.indexOf(v.playbackRate) + 1) % rates.length]; v.playbackRate = r; speed.textContent = r + "x"; });

    const pip = $(".vp-pip", box);
    if (!document.pictureInPictureEnabled) pip.style.display = "none";
    pip.addEventListener("click", () => document.pictureInPictureElement ? document.exitPictureInPicture() : v.requestPictureInPicture().catch(() => {}));

    $(".vp-full", box).addEventListener("click", () => {
      if (document.fullscreenElement) return document.exitFullscreen();
      if (box.requestFullscreen) box.requestFullscreen();
      else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen(); // iPhone
    });

    box.addEventListener("mousemove", () => { box.classList.remove("idle"); clearTimeout(idleT); idleT = setTimeout(() => box.classList.add("idle"), 2500); });
    box.tabIndex = 0;
    box.addEventListener("keydown", e => {
      if (e.target.tagName === "INPUT") return;
      if (e.key === " " || e.key === "k") { e.preventDefault(); toggle(); }
      if (e.key === "ArrowRight") v.currentTime += 5;
      if (e.key === "ArrowLeft") v.currentTime -= 5;
      if (e.key === "m") v.muted = !v.muted;
      if (e.key === "f") $(".vp-full", box).click();
    });
  }
  buildPlayer();

  /* ---------- Catalogue ---------- */
  const catSel = $("#category");
  CATEGORIES.forEach(c => catSel.insertAdjacentHTML("beforeend", `<option>${esc(c)}</option>`));

  function render() {
    const q = $("#search").value.trim().toLowerCase(), cat = catSel.value, sort = $("#sort").value;
    let list = PRODUCTS.filter(p => (!cat || p.category === cat) && (p.name + p.desc).toLowerCase().includes(q));
    const sorters = { featured: (a, b) => a.featured - b.featured, asc: (a, b) => a.price - b.price, desc: (a, b) => b.price - a.price, name: (a, b) => a.name.localeCompare(b.name, "fr") };
    list.sort(sorters[sort]);
    $("#grid").innerHTML = list.length ? list.map(p => `
      <article class="card product">
        <div class="thumb">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)}">` : p.emoji || "✨"}</div>
        <span class="cat">${esc(p.category)}</span>
        <h3>${esc(p.name)}</h3>
        <p class="muted">${esc(p.desc)}</p>
        <span class="price">${fmt(p.price)}</span>
        <button class="btn" data-add="${p.id}">Ajouter au panier</button>
      </article>`).join("") : `<p class="muted">Aucun produit trouvé.</p>`;
  }
  ["input", "change"].forEach(ev => ["#search", "#category", "#sort"].forEach(s => $(s).addEventListener(ev, render)));
  render();

  /* ---------- Panier ---------- */
  let cart = JSON.parse(localStorage.getItem("cart") || "{}");
  const save = () => localStorage.setItem("cart", JSON.stringify(cart));
  const total = () => Object.entries(cart).reduce((s, [id, q]) => s + (PRODUCTS.find(p => p.id == id)?.price || 0) * q, 0);

  function renderCart() {
    const items = Object.entries(cart).filter(([id]) => PRODUCTS.some(p => p.id == id));
    $("#cartItems").innerHTML = items.length ? items.map(([id, q]) => {
      const p = PRODUCTS.find(x => x.id == id);
      return `<div class="line"><span>${p.emoji || ""} ${esc(p.name)}<br><small class="muted">${fmt(p.price)}</small></span>
        <span class="qty"><button data-dec="${id}">−</button> ${q} <button data-inc="${id}">+</button></span></div>`;
    }).join("") : `<p class="muted">Votre panier est vide.</p>`;
    $("#cartCount").textContent = items.reduce((s, [, q]) => s + q, 0);
    $("#cartTotal").textContent = $("#orderTotal").textContent = fmt(total());
  }
  document.addEventListener("click", e => {
    const d = e.target.dataset;
    if (d.add) { cart[d.add] = (cart[d.add] || 0) + 1; toast("Ajouté au panier ✨"); }
    else if (d.inc) cart[d.inc]++;
    else if (d.dec) { if (--cart[d.dec] <= 0) delete cart[d.dec]; }
    else return;
    save(); renderCart();
  });

  const drawer = $("#cart"), overlay = $("#overlay");
  const openCart = () => { drawer.classList.add("open"); overlay.classList.add("show"); drawer.setAttribute("aria-hidden", "false"); };
  const closeCart = () => { drawer.classList.remove("open"); overlay.classList.remove("show"); drawer.setAttribute("aria-hidden", "true"); };
  $("#openCart").addEventListener("click", openCart);
  overlay.addEventListener("click", closeCart);
  drawer.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", closeCart));
  document.addEventListener("keydown", e => e.key === "Escape" && closeCart());
  renderCart();

  /* ---------- Commande (démo, sans paiement) ---------- */
  const dlg = $("#orderDialog"), form = $("#orderForm");
  $("#toOrder").addEventListener("click", () => {
    if (!Object.keys(cart).length) return toast("Votre panier est vide");
    closeCart(); dlg.showModal();
  });
  $("#submitOrder").addEventListener("click", () => {
    if (!form.reportValidity()) return;
    const f = new FormData(form);
    const lines = Object.entries(cart).map(([id, q]) => { const p = PRODUCTS.find(x => x.id == id); return `- ${p.name} x${q} : ${fmt(p.price * q)}`; });
    const body = `Nom : ${f.get("fullname")}\nE-mail : ${f.get("email")}\nTéléphone : ${f.get("phone")}\nAdresse : ${f.get("address")}\nLivraison : ${f.get("shipping")}\n\n${lines.join("\n")}\n\nTotal estimé : ${fmt(total())}\n\nMessage : ${f.get("message")}`;
    window.location.href = `mailto:${SHOP.email}?subject=${encodeURIComponent("Demande de commande")}&body=${encodeURIComponent(body)}`;
    dlg.close(); toast("Demande préparée dans votre messagerie");
  });

  /* ---------- Avis ---------- */
  const local = () => JSON.parse(localStorage.getItem("reviews") || "[]");
  function renderReviews() {
    $("#reviews").innerHTML = [...SAMPLE_REVIEWS, ...local()].map(r => `
      <div class="card"><strong>${esc(r.name)}</strong>${r.sample ? '<span class="tag">Exemple</span>' : '<span class="tag">Cet appareil</span>'}
      <div class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div><p>${esc(r.text)}</p></div>`).join("");
  }
  $("#reviewForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const rating = Math.min(5, Math.max(1, +f.get("rating")));
    localStorage.setItem("reviews", JSON.stringify([...local(), { name: f.get("name"), rating, text: f.get("text") }]));
    e.target.reset(); renderReviews(); toast("Avis ajouté sur cet appareil");
  });
  renderReviews();
})();
