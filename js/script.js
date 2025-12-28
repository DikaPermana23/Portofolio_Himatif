// Mobile Menu Script
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Close mobile menu when clicking a link
const mobileLinks = mobileMenu.querySelectorAll("a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.classList.add("shadow-lg");
  } else {
    nav.classList.remove("shadow-lg");
  }
});

// Lightbox Gallery Script
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxCounter = document.getElementById("lightbox-counter");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

let currentGallery = [];
let currentIndex = 0;

// Get all gallery images
const galleryImages = document.querySelectorAll(".gallery-img");

galleryImages.forEach((img) => {
  img.addEventListener("click", function () {
    const galleryName = this.dataset.gallery;
    const title = this.dataset.title;

    // Get all images from the same gallery
    currentGallery = Array.from(
      document.querySelectorAll(`img[data-gallery="${galleryName}"]`)
    );
    currentIndex = currentGallery.indexOf(this);

    openLightbox(title);
  });
});

function openLightbox(title) {
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
  updateLightbox(title);
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

function updateLightbox(title) {
  const img = currentGallery[currentIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxTitle.textContent = title || img.dataset.title;
  lightboxCounter.textContent = `${currentIndex + 1} / ${
    currentGallery.length
  }`;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  updateLightbox();
}

function prevImage() {
  currentIndex =
    (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  updateLightbox();
}

// Event Listeners
lightboxClose.addEventListener("click", closeLightbox);
lightboxNext.addEventListener("click", nextImage);
lightboxPrev.addEventListener("click", prevImage);

// Close on background click
lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox || e.target.classList.contains("lightbox-body")) {
    closeLightbox();
  }
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") {
    closeLightbox();
  } else if (e.key === "ArrowRight") {
    nextImage();
  } else if (e.key === "ArrowLeft") {
    prevImage();
  }
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", function (e) {
  touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener("touchend", function (e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextImage(); // Swipe left = next
    } else {
      prevImage(); // Swipe right = prev
    }
  }
}

// Profile Photo Popup Script
const profilePopup = document.getElementById("profile-popup");
const profilePopupImg = document.getElementById("profile-popup-img");
const profilePopupName = document.getElementById("profile-popup-name");
const profilePopupRole = document.getElementById("profile-popup-role");
const profilePopupClose = document.getElementById("profile-popup-close");
const popupInstagram = document.getElementById("popup-instagram");
const popupLinkedin = document.getElementById("popup-linkedin");
const popupGithub = document.getElementById("popup-github");
const popupEmail = document.getElementById("popup-email");

// Get all profile images
const profileImages = document.querySelectorAll(".profile-img");

profileImages.forEach((container) => {
  container.addEventListener("click", function () {
    const img = this.querySelector("img");
    const name = this.dataset.name || img.alt;
    const role = this.dataset.role || "";

    // Get social media links from data attributes or find nearby links
    const instagram = this.dataset.instagram || "#";
    const linkedin = this.dataset.linkedin || "#";
    const github = this.dataset.github || "#";
    const copemail = this.dataset.email || "";

    profilePopupImg.src = img.src;
    profilePopupImg.alt = name;
    profilePopupName.textContent = name;
    profilePopupRole.textContent = role;

    // Set social media links
    popupInstagram.href = instagram && instagram !== "#" ? instagram : "#";
    popupLinkedin.href = linkedin && linkedin !== "#" ? linkedin : "#";
    popupGithub.href = github && github !== "#" ? github : "#";
    popupEmail.href = email ? "mailto:" + email : "#";

    // Ensure clicking the email opens a new tab/window and set rel for safety
    popupEmail.target = email ? "_blank" : "";
    popupEmail.rel = email ? "noopener noreferrer" : "";
    // Add safe rel for external links when they exist
    popupInstagram.rel = instagram && instagram !== "#" ? "noopener noreferrer" : "";
    popupLinkedin.rel = linkedin && linkedin !== "#" ? "noopener noreferrer" : "";
    popupGithub.rel = github && github !== "#" ? "noopener noreferrer" : "";

    // Show/hide social icons based on availability (only show icons that exist)
    popupInstagram.style.display =
      instagram && instagram !== "#" ? "flex" : "none";
    popupLinkedin.style.display =
      linkedin && linkedin !== "#" ? "flex" : "none";
    popupGithub.style.display =
      github && github !== "#" ? "flex" : "none";
    popupEmail.style.display = email ? "flex" : "none";

    // If none of the social links exist, hide the socials container
    const socialsContainer = document.getElementById("profile-popup-socials");
    const hasAnySocial =
      (instagram && instagram !== "#") ||
      (linkedin && linkedin !== "#") ||
      (github && github !== "#") ||
      email;
    socialsContainer.style.display = hasAnySocial ? "flex" : "none";

    profilePopup.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

function closeProfilePopup() {
  profilePopup.classList.remove("active");
  document.body.style.overflow = "";
}

// Close button
profilePopupClose.addEventListener("click", closeProfilePopup);

// Close on background click
profilePopup.addEventListener("click", function (e) {
  if (e.target === profilePopup) {
    closeProfilePopup();
  }
});

// Close on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && profilePopup.classList.contains("active")) {
    closeProfilePopup();
  }
});

// Scroll Animation using Intersection Observer
document.addEventListener("DOMContentLoaded", function () {
  // Add scroll-animate class to elements
  const animateElements = [
    // Section headers
    {
      selector: "section .text-center.mb-16, section .text-center.mb-10",
      animation: "animate-fade",
    },
    // Cards and grid items
    { selector: ".card-hover", animation: "" },
    // Visi Misi boxes
    {
      selector: ".gradient-bg.rounded-2xl, .bg-gray-50.rounded-2xl",
      animation: "",
    },
    // Department cards
    { selector: ".bg-white.rounded-xl.shadow-md", animation: "" },
    // Gallery images
    { selector: ".gallery-img", animation: "animate-scale" },
    // Tables
    { selector: "table", animation: "animate-fade" },
    // Grid containers children
    { selector: ".grid > div", animation: "" },
  ];

  // Apply scroll-animate class to all target elements
  animateElements.forEach((item) => {
    document.querySelectorAll(item.selector).forEach((el, index) => {
      if (!el.classList.contains("scroll-animate")) {
        el.classList.add("scroll-animate");
        if (item.animation) {
          el.classList.add(item.animation);
        }
        // Add staggered delay for grid items (max 6)
        const delayClass = "delay-" + ((index % 6) + 1);
        el.classList.add(delayClass);
      }
    });
  });

  // Create Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe all scroll-animate elements
  document.querySelectorAll(".scroll-animate").forEach((el) => {
    observer.observe(el);
  });

  // Make elements above the fold visible immediately
  const viewportHeight = window.innerHeight;
  document.querySelectorAll(".scroll-animate").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < viewportHeight) {
      el.classList.add("visible");
    }
  });
});
