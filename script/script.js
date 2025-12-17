// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing...");

  // Check if Lenis is available
  if (typeof Lenis === "undefined") {
    console.error(
      "Lenis is not loaded! Check if CDN script is before script.js"
    );
    return;
  }

  // Initialize Lenis for smooth scrolling
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  console.log("Lenis initialized successfully!");

  // Animation frame for Lenis
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Mobile Menu Toggle
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    menuBtn.textContent = mobileMenu.classList.contains("active") ? "✕" : "☰";
  });

  // Page Navigation
  window.navigateTo = function (pageName) {
    console.log("Navigating to:", pageName);

    // Stop Lenis scroll temporarily
    lenis.stop();

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
    document
      .querySelectorAll(".nav-links a, .mobile-menu a")
      .forEach((link) => {
        link.classList.remove("active");
        if (link.dataset.page === pageName) {
          link.classList.add("active");
        }
      });

    // Close mobile menu
    mobileMenu.classList.remove("active");
    menuBtn.textContent = "☰";

    // Scroll to top smoothly with Lenis
    lenis.scrollTo(0, {
      immediate: true,
    });

    // Resume Lenis after a brief delay
    setTimeout(() => {
      lenis.start();
    }, 100);

    // Re-observe content based on page
    if (pageName === "projects") {
      setTimeout(observeProjectCards, 300);
    } else if (pageName === "about") {
      setTimeout(observeAboutContent, 300);
    } else if (pageName === "home") {
      // Trigger hero animation replay
      replayHeroAnimation();
    }
  };

  // Function to replay hero animation
  function replayHeroAnimation() {
    const heroDiv = document.querySelector(".hero > div");
    const heroH1 = document.querySelector(".hero h1");
    const heroP = document.querySelectorAll(".hero p");
    const contactBtn = document.querySelector(".hero .contact-btn");

    // Remove animations
    [heroDiv, heroH1, ...heroP, contactBtn].forEach((el) => {
      if (el) {
        el.style.animation = "none";
        el.offsetHeight; // Trigger reflow
      }
    });

    // Re-add animations
    setTimeout(() => {
      if (heroDiv) heroDiv.style.animation = "";
      if (heroH1) heroH1.style.animation = "";
      heroP.forEach((p) => (p.style.animation = ""));
      if (contactBtn) contactBtn.style.animation = "";
    }, 10);
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

  // 1. IMPORTANT: Target the correct new class name (.skill-category-card)
  // This hides them before the user scrolls down
  document.querySelectorAll(".skill-category-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)"; // Start slightly lower
  });

  // 2. Scroll-triggered animations
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Skills section visible, animating...");

          const categoryCards = entry.target.querySelectorAll(
            ".skill-category-card"
          );

          // CONFIGURATION
          const initialDelay = 500; // Wait 300ms before starting the whole sequence
          const staggerDelay = 500; // Wait 200ms between each card

          categoryCards.forEach((card, idx) => {
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, initialDelay + idx * staggerDelay);
            // Math: 300ms + (0 * 200) = 300ms for 1st card
            // Math: 300ms + (1 * 200) = 500ms for 2nd card, etc.
          });

          skillsObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observe skills section
  const skillsSection = document.querySelector(".skills-section");
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }

  // Scroll-triggered animations for About section (HomePage)
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("About section visible, animating...");
        const title = entry.target.querySelector(".section-title");
        const content = entry.target.querySelector(".about-content");

        if (title) {
          title.style.opacity = "0";
          title.style.transform = "translateY(-30px)";
          setTimeout(() => {
            title.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
            title.style.opacity = "1";
            title.style.transform = "translateY(0)";
          }, 100);
        }

        if (content) {
          content.style.opacity = "0";
          content.style.transform = "translateY(30px)";
          setTimeout(() => {
            content.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
            content.style.opacity = "1";
            content.style.transform = "translateY(0)";
          }, 300);
        }

        aboutObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe about section on home page
  const aboutSectionHome = document.querySelector("#homePage .about-section");
  if (aboutSectionHome) {
    aboutObserver.observe(aboutSectionHome);
    console.log("About section observer set up");
  }

  // Function to observe project cards
  function observeProjectCards() {
    const projectCards = document.querySelectorAll(
      ".projects-page-grid .project-card"
    );
    projectCards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(50px)";
      projectsObserver.observe(card);
    });
    console.log("Observing", projectCards.length, "project cards");
  }

  // Animations for About Page
  const aboutPageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("About page content visible, animating...");
          entry.target.style.transition = "all 1s cubic-bezier(0.4, 0, 0.2, 1)";
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0) scale(1)";
          aboutPageObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px",
    }
  );

  // Function to observe about page content
  function observeAboutContent() {
    const aboutTitle = document.querySelector("#aboutPage .section-title");
    const aboutBox = document.querySelector("#aboutPage .contact-box");

    if (aboutTitle) {
      aboutTitle.style.opacity = "0";
      aboutTitle.style.transform = "translateY(-50px)";
      setTimeout(() => {
        aboutTitle.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        aboutTitle.style.opacity = "1";
        aboutTitle.style.transform = "translateY(0)";
      }, 100);
    }

    if (aboutBox) {
      aboutBox.style.opacity = "0";
      aboutBox.style.transform = "translateY(50px) scale(0.95)";
      aboutPageObserver.observe(aboutBox);
    }

    console.log("About page animations initialized");
  }

  // Observe project cards initially
  setTimeout(observeProjectCards, 500);

  // Add parallax effect to hero section
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const hero = document.querySelector(".hero");
        const homePage = document.getElementById("homePage");

        if (hero && homePage && !homePage.classList.contains("hidden")) {
          const scrolled = window.pageYOffset;
          hero.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        lenis.scrollTo(target, {
          offset: -80,
          duration: 1.5,
        });
      }
    });
  });

  console.log("All scripts initialized successfully!");
});

/* =========================================
     1. Featured Projects Animation
     ========================================= */
const projectsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("Projects section visible, animating...");

        // Select cards based on view (Grid for desktop, Carousel for mobile)
        // We select BOTH to be safe, the browser will only animate what exists/is visible
        const cards = entry.target.querySelectorAll(".project-card");

        cards.forEach((card, idx) => {
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, idx * 300); // 300ms delay between each card
        });

        projectsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

// Target the Projects Section
const projectsSection = document.querySelector(".projects-section");
if (projectsSection) {
  projectsObserver.observe(projectsSection);
}

/* =========================================
     2. About Section Animation
     ========================================= */
const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("About section visible, animating...");

        const title = entry.target.querySelector(".section-title");
        const text = entry.target.querySelector(".about-content p");

        // Animate Title (Immediate)
        if (title) {
          title.style.opacity = "1";
          title.style.transform = "translateY(0)";
        }

        // Animate Text (Delayed by 300ms)
        if (text) {
          setTimeout(() => {
            text.style.opacity = "1";
            text.style.transform = "translateY(0)";
          }, 400);
        }

        aboutObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 } // Wait until 30% of the section is visible
);

// Target the About Section
const aboutSection = document.querySelector(".about-section");
if (aboutSection) {
  aboutObserver.observe(aboutSection);
}

// dsa and data analysis section links js
// Add this to your existing script.js file

// Explore Section Animations
const exploreObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        console.log("Explore card visible, animating...");

        // Initial hidden state
        entry.target.style.opacity = "0";
        entry.target.style.transform = "translateY(50px)";

        // Stagger animation based on index
        const delay = index * 200; // 200ms delay between cards

        setTimeout(() => {
          entry.target.style.transition =
            "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, delay);

        exploreObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  }
);

// Observe explore cards
const exploreCards = document.querySelectorAll(".explore-card");
exploreCards.forEach((card, index) => {
  // Add index as data attribute for stagger effect
  card.setAttribute("data-index", index);
  exploreObserver.observe(card);
});

// Optional: Add click animation to entire card
exploreCards.forEach((card) => {
  card.addEventListener("click", function (e) {
    // If clicked element is not the button, navigate to the link
    if (!e.target.closest(".explore-btn")) {
      const link = this.querySelector(".explore-btn");
      if (link) {
        window.location.href = link.getAttribute("href");
      }
    }
  });
});

console.log("Explore section animations initialized!");
