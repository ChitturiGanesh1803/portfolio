(function () {
  // Gallery source data dictionary (replaces static HTML layout for high-speed page loads)
  const GALLERY_DATA = {
    college1: [
      "../assets/images/gallery/ciet/ciet (1).jpg",
      "../assets/images/gallery/ciet/ciet (2).jpg",
      "../assets/images/gallery/ciet/ciet (3).jpg",
      "../assets/images/gallery/ciet/ciet (4).jpg"
    ],
    college2: [
      "../assets/images/gallery/litam/1 (1).jpg",
      "../assets/images/gallery/litam/1 (2).jpg",
      "../assets/images/gallery/litam/1 (3).jpg",
      "../assets/images/gallery/litam/1 (4).jpg",
      "../assets/images/gallery/litam/1.jpg",
      "../assets/images/gallery/litam/2 (1).jpg",
      "../assets/images/gallery/litam/2 (2).jpg",
      "../assets/images/gallery/litam/2.jpg",
      "../assets/images/gallery/litam/3 (1).jpg",
      "../assets/images/gallery/litam/3 (2).jpg",
      "../assets/images/gallery/litam/3.jpg",
      "../assets/images/gallery/litam/4 (1).jpg",
      "../assets/images/gallery/litam/4 (2).jpg",
      "../assets/images/gallery/litam/4.jpg",
      "../assets/images/gallery/litam/5 (1).jpg",
      "../assets/images/gallery/litam/5 (2).jpg",
      "../assets/images/gallery/litam/5 (3).jpg",
      "../assets/images/gallery/litam/6 (1).jpg",
      "../assets/images/gallery/litam/6 (2).jpg",
      "../assets/images/gallery/litam/6 (3).jpg",
      "../assets/images/gallery/litam/6 (4).jpg",
      "../assets/images/gallery/litam/6 (5).jpg",
      "../assets/images/gallery/litam/6 (6).jpg",
      "../assets/images/gallery/litam/litam.jpeg",
      "../assets/images/gallery/litam/Litam_h&b (1).jpg",
      "../assets/images/gallery/litam/Litam_h&b (2).jpg",
      "../assets/images/gallery/litam/Litam_h&b (3).jpg",
      "../assets/images/gallery/litam/Litam_h&b (4).jpg"
    ],
    college3: [
      "../assets/images/gallery/nalanda/nalanda (1).jpg",
      "../assets/images/gallery/nalanda/nalanda (2).jpg",
      "../assets/images/gallery/nalanda/nalanda (3).jpg"
    ],
    college4: [
      "../assets/images/gallery/pragati/pragati (1).jpg",
      "../assets/images/gallery/pragati/pragati (2).jpg",
      "../assets/images/gallery/pragati/pragati (3).jpg"
    ],
    college5: [
      "../assets/images/gallery/rk/1.jpg",
      "../assets/images/gallery/rk/2.jpg",
      "../assets/images/gallery/rk/3.jpg",
      "../assets/images/gallery/rk/Rk (1).jpg",
      "../assets/images/gallery/rk/Rk (2).jpg",
      "../assets/images/gallery/rk/Rk (3).jpg",
      "../assets/images/gallery/rk/Rk (4).jpg",
      "../assets/images/gallery/rk/Rk (5).jpg",
      "../assets/images/gallery/rk/Rk (6).jpg",
      "../assets/images/gallery/rk/Rk.jpg"
    ],
    college6: [
      "../assets/images/gallery/stanns/stanns (1).jpg",
      "../assets/images/gallery/stanns/stanns (2).jpg",
      "../assets/images/gallery/stanns/stanns (3).jpg",
      "../assets/images/gallery/stanns/stanns (4).jpg",
      "../assets/images/gallery/stanns/stanns (5).jpg"
    ],
    college7: [
      "../assets/images/gallery/stmarys/1 (1).jpg",
      "../assets/images/gallery/stmarys/1 (2).jpg",
      "../assets/images/gallery/stmarys/1.jpg",
      "../assets/images/gallery/stmarys/2 (1).jpg",
      "../assets/images/gallery/stmarys/2.jpg",
      "../assets/images/gallery/stmarys/3 (1).jpg",
      "../assets/images/gallery/stmarys/3 (2).jpg",
      "../assets/images/gallery/stmarys/3.jpg",
      "../assets/images/gallery/stmarys/4 (1).jpg",
      "../assets/images/gallery/stmarys/4 (2).jpg",
      "../assets/images/gallery/stmarys/5 (1).jpg",
      "../assets/images/gallery/stmarys/5 (2).jpg",
      "../assets/images/gallery/stmarys/6.jpg",
      "../assets/images/gallery/stmarys/Stmarys_h&b (1).jpg",
      "../assets/images/gallery/stmarys/Stmarys_h&b (2).jpg",
      "../assets/images/gallery/stmarys/Stmarys_h&b (3).jpg",
      "../assets/images/gallery/stmarys/Stmarys_h&b (4).jpg",
      "../assets/images/gallery/stmarys/stmarys_logo.jpg"
    ],
    college8: [
      "../assets/images/gallery/eswar/1.jpg",
      "../assets/images/gallery/eswar/2.jpg",
      "../assets/images/gallery/eswar/3.jpg",
      "../assets/images/gallery/eswar/4.jpg",
      "../assets/images/gallery/eswar/5.jpg",
      "../assets/images/gallery/eswar/eswarlogo.png"
    ],
    college9: [
      "../assets/images/gallery/sacet/1.jpg",
      "../assets/images/gallery/sacet/2.jpg",
      "../assets/images/gallery/sacet/3.jpg",
      "../assets/images/gallery/sacet/4.jpg",
      "../assets/images/gallery/sacet/5.jpg",
      "../assets/images/gallery/sacet/sacet.jpg"
    ]
  };

  let currentImages = [];
  let currentImageIndex = 0;
  let originTriggerElement = null; // Store trigger for accessibility focus restoration

  const galleryModal = document.getElementById("dynamic-gallery-modal");
  const galleryImagesContainer = document.getElementById("dynamic-gallery-images");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  // Open Gallery Overlay Dynamically
  window.showGallery = function (id) {
    originTriggerElement = document.activeElement;
    const imagesList = GALLERY_DATA[id];
    if (!imagesList || !galleryModal || !galleryImagesContainer) return;

    galleryModal.dataset.college = id;
    currentImages = imagesList;
    galleryImagesContainer.innerHTML = "";

    // Build DOM structure dynamically for lazy image retrieval
    imagesList.forEach((src, idx) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `Gallery picture ${idx + 1}`;
      img.loading = "lazy";
      img.tabIndex = 0;
      img.role = "button";
      img.ariaLabel = `Expand gallery picture ${idx + 1}`;

      img.addEventListener("click", () => openLightbox(idx));
      img.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(idx);
        }
      });
      galleryImagesContainer.appendChild(img);
    });

    galleryModal.style.display = "block";

    // Trap focus to close button
    const closeBtn = galleryModal.querySelector(".close");
    if (closeBtn) closeBtn.focus();
  };

  // Close Gallery Overlay
  window.closeGallery = function () {
    if (!galleryModal) return;
    galleryModal.style.display = "none";
    galleryImagesContainer.innerHTML = "";
    window.closeLightbox();

    if (originTriggerElement) {
      originTriggerElement.focus();
    }
  };

  // Open Lightbox view
  function openLightbox(index) {
    if (!lightbox || !lightboxImg) return;
    currentImageIndex = index;
    lightboxImg.src = currentImages[currentImageIndex];

    lightbox.style.display = "flex";
    requestAnimationFrame(() => {
      lightbox.classList.add("visible");
    });

    // Set focus inside Lightbox dialog
    const closeBtn = lightbox.querySelector(".close");
    if (closeBtn) closeBtn.focus();
  }

  // Close Lightbox view
  window.closeLightbox = function () {
    if (!lightbox) return;
    lightbox.classList.remove("visible");
    setTimeout(() => {
      lightbox.style.display = "none";
    }, 200);

    // Restore focus to index image
    const imgs = galleryImagesContainer.querySelectorAll("img");
    if (imgs[currentImageIndex]) {
      imgs[currentImageIndex].focus();
    }
  };

  // Next Lightbox Image
  window.nextImage = function () {
    if (!currentImages.length) return;
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    updateLightboxImage();
  };

  // Previous Lightbox Image
  window.prevImage = function () {
    if (!currentImages.length) return;
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxImage();
  };

  // Refresh Lightbox Element Image Src
  function updateLightboxImage() {
    if (!lightboxImg) return;
    lightboxImg.classList.add("fade");

    setTimeout(() => {
      lightboxImg.src = currentImages[currentImageIndex];
      lightboxImg.classList.remove("fade");
    }, 150);
  }

  // Keyboard controls (Arrow keys + Esc)
  document.addEventListener("keydown", function (e) {
    // Handle lightbox controls
    if (lightbox && lightbox.style.display === "flex") {
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          window.nextImage();
          break;
        case "ArrowLeft":
          e.preventDefault();
          window.prevImage();
          break;
        case "Escape":
          e.preventDefault();
          window.closeLightbox();
          break;
      }
    }
    // Handle general dynamic gallery modal close
    else if (galleryModal && galleryModal.style.display === "block") {
      if (e.key === "Escape") {
        e.preventDefault();
        window.closeGallery();
      }
    }
  });

  // Close Lightbox clicking outside target
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        window.closeLightbox();
      }
    });
  }
})();
