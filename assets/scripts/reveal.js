(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // Stagger siblings in dynamic elements for incremental animations
  const groups = new Map();
  items.forEach((el) => {
    const key = el.parentElement;
    const index = groups.get(key) || 0;
    el.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
    groups.set(key, index + 1);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
  );

  items.forEach((el) => observer.observe(el));
})();
