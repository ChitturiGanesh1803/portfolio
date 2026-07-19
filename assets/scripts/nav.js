(function () {
  const navContainer = document.getElementById("nav-container");
  if (!navContainer) return;

  const pathname = window.location.pathname;
  const isHomePage =
    pathname.endsWith("/index.html") ||
    pathname === "/" ||
    pathname.endsWith("/portfolio/") ||
    pathname.endsWith("/portfolio");
  const isGalleryPage = pathname.includes("/gallery.html") || pathname.endsWith("/gallery.html");
  const isCertificatePage = pathname.includes("/certificate.html") || pathname.endsWith("/certificate.html");
  const isSubPage = pathname.includes("/pages/");

  const basePath = isSubPage ? "../" : "./";
  const homeHref = isSubPage ? "../index.html" : "./index.html";

  const createNav = () => `
    <nav id="desktop-nav" role="navigation" aria-label="Primary">
      <a class="logo" href="${homeHref}">Sai Ganesh Kumar Chitturi</a>
      <div>
        <ul class="nav-links">
          <li><a href="${isHomePage ? "#about" : `${basePath}index.html#about`}">About</a></li>
          <li><a href="${isHomePage ? "#Tools" : `${basePath}index.html#Tools`}">Tools</a></li>
          <li><a href="${isHomePage ? "#experience" : `${basePath}index.html#experience`}">Experience</a></li>
          <li><a href="${isHomePage ? "#projects" : `${basePath}index.html#projects`}">Projects</a></li>
          <li><a href="${isHomePage ? "#contact" : `${basePath}index.html#contact`}">Contact</a></li>
          <li><a class="${isGalleryPage ? "active" : ""}" href="${isSubPage ? "./gallery.html" : `${basePath}pages/gallery.html`}">Gallery</a></li>
          <li><a class="${isCertificatePage ? "active" : ""}" href="${isSubPage ? "./certificate.html" : `${basePath}pages/certificate.html`}">Certificates</a></li>
        </ul>
      </div>
    </nav>
    <nav id="hamburger-nav" role="navigation" aria-label="Mobile">
      <a class="logo" href="${homeHref}">SGK_CH</a>
      <div class="hamburger-menu">
        <button id="hamburger-btn" class="hamburger-icon" aria-expanded="false" aria-controls="mobile-menu" aria-label="Toggle menu" onclick="toggleMenu()">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul id="mobile-menu" class="menu-links" role="menu">
          <li role="none"><a role="menuitem" href="${isHomePage ? "#about" : `${basePath}index.html#about`}" onclick="toggleMenu()">About</a></li>
          <li role="none"><a role="menuitem" href="${isHomePage ? "#Tools" : `${basePath}index.html#Tools`}" onclick="toggleMenu()">Tools</a></li>
          <li role="none"><a role="menuitem" href="${isHomePage ? "#experience" : `${basePath}index.html#experience`}" onclick="toggleMenu()">Experience</a></li>
          <li role="none"><a role="menuitem" href="${isHomePage ? "#projects" : `${basePath}index.html#projects`}" onclick="toggleMenu()">Projects</a></li>
          <li role="none"><a role="menuitem" href="${isHomePage ? "#contact" : `${basePath}index.html#contact`}" onclick="toggleMenu()">Contact</a></li>
          <li role="none"><a role="menuitem" class="${isGalleryPage ? "active" : ""}" href="${isSubPage ? "./gallery.html" : `${basePath}pages/gallery.html`}" onclick="toggleMenu()">Gallery</a></li>
          <li role="none"><a role="menuitem" class="${isCertificatePage ? "active" : ""}" href="${isSubPage ? "./certificate.html" : `${basePath}pages/certificate.html`}" onclick="toggleMenu()">Certificates</a></li>
        </ul>
      </div>
    </nav>`;

  navContainer.innerHTML = createNav();

  // Scroll handler to toggle scrolled background style on the navbar header
  window.addEventListener(
    "scroll",
    () => {
      const scrolled = window.scrollY > 20;
      if (scrolled) {
        navContainer.classList.add("scrolled");
      } else {
        navContainer.classList.remove("scrolled");
      }
    },
    { passive: true }
  );

  // Escape key handler to close active mobile menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const menu = document.querySelector(".menu-links");
      const icon = document.querySelector(".hamburger-icon");
      if (menu && menu.classList.contains("open")) {
        menu.classList.remove("open");
        icon.classList.remove("open");
        icon.setAttribute("aria-expanded", "false");
        document.getElementById("hamburger-btn")?.focus();
      }
    }
  });

  // Active section highlights via IntersectionObserver (only relevant for Homepage)
  if (isHomePage) {
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-links a");

    if (sections.length && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              const activeLink = document.querySelector(`.nav-links a[href$="#${id}"]`);
              if (activeLink) {
                links.forEach((l) => {
                  if (!l.href.includes("gallery.html") && !l.href.includes("certificate.html")) {
                    l.classList.remove("active");
                  }
                });
                activeLink.classList.add("active");
              }
            }
          });
        },
        { root: null, rootMargin: "-30% 0px -30% 0px", threshold: 0.1 }
      );

      sections.forEach((s) => observer.observe(s));
    }
  }

  // Inject Floating Button HTML
  const floatBtnHtml = `
    <button id="floating-home-btn" aria-label="Go to homepage" onclick="handleHomeRedirect()">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    </button>`;
  document.body.insertAdjacentHTML("beforeend", floatBtnHtml);

  // Preloader fade-out
  const hidePreloader = () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }
  };
  if (document.readyState === "complete") {
    hidePreloader();
  } else {
    window.addEventListener("load", hidePreloader);
  }

  // Floating Button Scroll Handler
  const floatBtn = document.getElementById("floating-home-btn");
  if (floatBtn) {
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 300) {
          floatBtn.classList.add("visible");
        } else {
          floatBtn.classList.remove("visible");
        }
      },
      { passive: true }
    );
  }

  // Floating Button Click Router
  window.handleHomeRedirect = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = isSubPage ? "../index.html" : "./index.html";
    }
  };

  // Logo Click Scroll to Top
  document.querySelectorAll(".logo").forEach((logo) => {
    logo.addEventListener("click", (e) => {
      if (isHomePage) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (history.pushState) {
          history.pushState("", document.title, window.location.pathname + window.location.search);
        } else {
          window.location.hash = "";
        }
      }
    });
  });

  // Manual Scroll Restoration to guarantee Hero section displays first on reload
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.addEventListener("load", () => {
    // Always force scroll to top on fresh page load to display the Hero section first
    window.scrollTo(0, 0);
    const hash = window.location.hash;
    if (hash) {
      if (history.pushState) {
        history.pushState("", document.title, window.location.pathname + window.location.search);
      } else {
        window.location.hash = "";
      }
    }
  });
})();
