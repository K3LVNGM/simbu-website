/* ==========================================================================
   Alphonce Felix Simbu — site behaviour
   Progressive enhancement only: every page is readable with JS disabled.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- sticky masthead state ---------- */

  const masthead = document.querySelector(".masthead");
  if (masthead) {
    const setStuck = () => {
      masthead.classList.toggle("is-stuck", window.scrollY > 24);
    };
    setStuck();
    window.addEventListener("scroll", setStuck, { passive: true });
  }

  /* ---------- mobile nav ---------- */

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- scroll reveal ---------- */

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (!("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
      );
      reveals.forEach((el) => io.observe(el));
    }
  }

  /* ---------- gallery: category filter ---------- */

  const filters = document.querySelectorAll(".filter");
  const shots = document.querySelectorAll(".shot");
  if (filters.length && shots.length) {
    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        const want = btn.dataset.filter;
        filters.forEach((b) =>
          b.setAttribute("aria-pressed", String(b === btn))
        );
        shots.forEach((shot) => {
          shot.hidden = want !== "all" && shot.dataset.category !== want;
        });
      });
    });
  }

  /* ---------- gallery: lightbox ---------- */

  const lightbox = document.querySelector(".lightbox");
  if (lightbox && shots.length) {
    const lbImg = lightbox.querySelector("img");
    const lbCap = lightbox.querySelector("figcaption");
    const lbClose = lightbox.querySelector(".lightbox__close");
    let lastFocused = null;

    const open = (shot) => {
      const img = shot.querySelector("img");
      lastFocused = shot;
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = img.alt;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      lbClose.focus();
    };

    const close = () => {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    };

    shots.forEach((shot) => shot.addEventListener("click", () => open(shot)));
    lbClose.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) close();
    });
  }

  /* ---------- campaign: EN / SW copy toggle ---------- */

  const langButtons = document.querySelectorAll("[data-lang]");
  if (langButtons.length) {
    langButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        langButtons.forEach((b) =>
          b.setAttribute("aria-pressed", String(b === btn))
        );
        document.querySelectorAll("[data-lang-copy]").forEach((el) => {
          el.hidden = el.dataset.langCopy !== lang;
        });
      });
    });
  }

  /* ---------- share buttons ---------- */

  document.querySelectorAll("[data-share]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = window.location.href;
      const text = btn.dataset.shareText || document.title;
      const map = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
        x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
      };
      const target = map[btn.dataset.share];
      if (target) window.open(target, "_blank", "noopener,noreferrer");
    });
  });

  /* ---------- forms: client-side validation + inline status ----------
     No backend is wired up in this static build. Submitting shows a
     confirmation and clears the form; point `action` at a real endpoint
     (Formspree, Netlify Forms, your own API) to send for real.          */

  document.querySelectorAll("form[data-local]").forEach((form) => {
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      if (status) {
        status.hidden = false;
        status.textContent =
          form.dataset.successMessage ||
          "Thank you — your message has been recorded.";
        status.setAttribute("role", "status");
      }
      form.reset();
    });
  });
})();
