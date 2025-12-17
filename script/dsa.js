// Initialize Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  smooth: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "0";
      entry.target.style.transform = "translateY(30px)";
      setTimeout(() => {
        entry.target.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }, 100);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe pattern cards
document.querySelectorAll(".pattern-card").forEach((card) => {
  observer.observe(card);
});

console.log("DSA Patterns page loaded with Lenis!");
