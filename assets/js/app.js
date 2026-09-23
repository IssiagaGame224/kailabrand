
/* ============================================================
   KAILA BRAND — Navigation maquette (hash natif, infaillible)
   Chaque lien est un vrai <a href="#page"> : la navigation
   fonctionne même sans JavaScript.
   ============================================================ */
(function () {
  var pages = document.querySelectorAll(".page");

  function show(id) {
    var target = document.getElementById("page-" + id);
    if (!target) id = "home"; // id inconnu -> accueil

    pages.forEach(function (p) {
      p.classList.toggle("active", p.id === "page-" + id);
    });

    /* Lien actif dans la navigation principale */
    document.querySelectorAll(".nav__links a").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + id);
    });

    window.scrollTo(0, 0);
  }

  function current() {
    var h = window.location.hash.replace("#", "");
    return h || "home";
  }

  /* Changement de page via le hash (liens natifs) */
  window.addEventListener("hashchange", function () {
    show(current());
  });

  /* Boutons internes (CTA) : on change juste le hash */
  document.querySelectorAll("[data-nav]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.hash = el.getAttribute("data-nav");
    });
  });

  /* Pillules de langue EN/ES (démo visuelle) */
  document.querySelectorAll(".lang-pill button").forEach(function (b) {
    b.addEventListener("click", function () {
      b.parentElement.querySelectorAll("button").forEach(function (x) {
        x.classList.remove("on");
      });
      b.classList.add("on");
    });
  });

  /* Page initiale (deep-link : #collections, #contact...) */
  show(current());
})();

/* ---------- Menu mobile (burger) ---------- */
(function () {
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobileMenu");
  if (!burger || !menu) return;

  function closeMenu() {
    burger.classList.remove("open");
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }

  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });

  /* Fermer après un clic sur un lien ou un changement de page */
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });
  window.addEventListener("hashchange", closeMenu);
})();
