/**
 * Core portfolio global helper scripts
 */
"use strict";

window.toggleMenu = function () {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (!menu || !icon) return;

  const isOpen = menu.classList.toggle("open");
  icon.classList.toggle("open");

  // Toggle the button state attribute for screen readers
  icon.setAttribute("aria-expanded", isOpen ? "true" : "false");

  if (isOpen) {
    // Focus first navigation item on mobile popup open
    const firstLink = menu.querySelector("a");
    if (firstLink) {
      firstLink.focus();
    }
  }
};
