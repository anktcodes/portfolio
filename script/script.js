// Mobile Menu Toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  menuBtn.textContent = mobileMenu.classList.contains("active") ? "✕" : "☰";
});

// Page Navigation
function navigateTo(pageName) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.add("hidden");
  });

  // Show selected page
  const pageMap = {
    home: "homePage",
    projects: "projectsPage",
    about: "aboutPage",
    contact: "contactPage",
  };
  document.getElementById(pageMap[pageName]).classList.remove("hidden");

  // Update nav links
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((link) => {
    link.classList.remove("active");
    if (link.dataset.page === pageName) {
      link.classList.add("active");
    }
  });

  // Close mobile menu
  mobileMenu.classList.remove("active");
  menuBtn.textContent = "☰";

  // Scroll to top
  window.scrollTo(0, 0);
}

// Add click events to all navigation links
document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo(link.dataset.page);
  });
});

// Projects Carousel
const carousel = document.getElementById("projectsCarousel");
const cards = carousel.querySelectorAll(".project-card");
const indicators = document.querySelectorAll(".indicator");
let currentIndex = 0;

function updateCarousel() {
  cards.forEach((card, index) => {
    card.classList.remove("center");
    if (index === currentIndex) {
      card.classList.add("center");
    }
  });

  indicators.forEach((indicator, index) => {
    indicator.classList.remove("active");
    if (index === currentIndex) {
      indicator.classList.add("active");
    }
  });
}

// Scroll event listener for carousel
carousel.addEventListener("scroll", () => {
  const scrollLeft = carousel.scrollLeft;
  const cardWidth = carousel.offsetWidth * 0.7;
  const gap = 16;
  currentIndex = Math.round(scrollLeft / (cardWidth + gap));
  updateCarousel();
});

// Indicator click events
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    const cardWidth = carousel.offsetWidth * 0.7;
    const gap = 16;
    carousel.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });
  });
});
