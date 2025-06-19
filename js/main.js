// Main JavaScript for Riverside Legal Group Website

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector(".nav");

  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener("click", function () {
      nav.classList.toggle("active");
      mobileMenuToggle.classList.toggle("active");
    });
  }

  // Smooth Scrolling for Navigation Links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const testimonialDots = document.querySelectorAll(".testimonial-dot");
  let currentSlide = 0;

  function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach((slide) => slide.classList.remove("active"));
    testimonialDots.forEach((dot) => dot.classList.remove("active"));

    // Show current slide
    if (testimonialSlides[index]) {
      testimonialSlides[index].classList.add("active");
    }
    if (testimonialDots[index]) {
      testimonialDots[index].classList.add("active");
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
  }

  // Auto-advance testimonials
  if (testimonialSlides.length > 1) {
    setInterval(nextSlide, 5000);
  }

  // Manual testimonial navigation
  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Back to Top Button
  const backToTopButton = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Contact Form Validation
  const contactForm = document.getElementById("consultation-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const legalMatter = formData.get("legal-matter");

      // Basic validation
      let isValid = true;
      let errorMessage = "";

      if (!name || name.trim().length < 2) {
        isValid = false;
        errorMessage = "Please enter your full name (minimum 2 characters).";
      } else if (!email || !isValidEmail(email)) {
        isValid = false;
        errorMessage = "Please enter a valid email address.";
      } else if (!legalMatter) {
        isValid = false;
        errorMessage = "Please select a legal matter.";
      }

      if (!isValid) {
        showFormMessage(errorMessage, "error");
        return;
      }

      // Simulate form submission
      showFormMessage(
        "Thank you! We will contact you within 24 hours to schedule your consultation.",
        "success"
      );
      this.reset();
    });
  }

  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Show form messages
  function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement("div");
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;

    // Insert message after form
    const form = document.getElementById("consultation-form");
    form.parentNode.insertBefore(messageDiv, form.nextSibling);

    // Auto-remove message after 5 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }

  // Header scroll effect
  const header = document.querySelector(".header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScrollTop = scrollTop;
  });

  // Practice area cards hover effect
  const practiceCards = document.querySelectorAll(".practice-card");
  practiceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Attorney cards hover effect
  const attorneyCards = document.querySelectorAll(".attorney-card");
  attorneyCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Dropdown menu functionality for mobile
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");

    if (toggle && menu) {
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        menu.classList.toggle("show");
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      const openDropdowns = document.querySelectorAll(".dropdown-menu.show");
      openDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("show");
      });
    }
  });

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".practice-card, .feature-card, .attorney-card, .testimonial-slide"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });

  // Phone number click tracking
  const phoneNumbers = document.querySelectorAll('a[href^="tel:"]');
  phoneNumbers.forEach((phone) => {
    phone.addEventListener("click", function () {
      // Track phone call clicks (analytics placeholder)
      console.log("Phone number clicked:", this.href);
    });
  });

  // Form field focus effects
  const formFields = document.querySelectorAll("input, select, textarea");
  formFields.forEach((field) => {
    field.addEventListener("focus", function () {
      this.parentNode.classList.add("focused");
    });

    field.addEventListener("blur", function () {
      if (!this.value) {
        this.parentNode.classList.remove("focused");
      }
    });
  });

  // Initialize tooltips for practice area icons
  const practiceIcons = document.querySelectorAll(".practice-icon");
  practiceIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      const title = this.parentNode.querySelector("h3").textContent;
      this.setAttribute("title", title);
    });
  });

  // Lazy loading for images
  const images = document.querySelectorAll('img[loading="lazy"]');
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  // Accessibility improvements
  // Add skip link functionality
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Skip to main content";
  skipLink.className = "skip-link";
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add keyboard navigation for dropdowns
  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");

    if (toggle && menu) {
      toggle.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          menu.classList.toggle("show");
        }
      });
    }
  });

  // Console welcome message
  console.log(
    "%cRiverside Legal Group",
    "color: #1e3a8a; font-size: 20px; font-weight: bold;"
  );
  console.log(
    "%cThank you for visiting our website!",
    "color: #f59e0b; font-size: 14px;"
  );

  // FAQ Accordion Functionality
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (question && answer) {
      question.addEventListener("click", function () {
        const isActive = item.classList.contains("active");

        // Close all other FAQ items
        faqItems.forEach((otherItem) => {
          otherItem.classList.remove("active");
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add("active");
        }
      });

      // Keyboard accessibility
      question.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          question.click();
        }
      });
    }
  });

  // Resources Tab Functionality
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      // Remove active class from all buttons and panes
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      // Add active class to clicked button and corresponding pane
      this.classList.add("active");
      const targetPane = document.getElementById(targetTab);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });

    // Keyboard accessibility
    button.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        button.click();
      }
    });
  });

  // Newsletter Form Functionality
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (isValidEmail(email)) {
        // Show success message
        showFormMessage(
          "Thank you for subscribing to our newsletter!",
          "success"
        );
        emailInput.value = "";
      } else {
        showFormMessage("Please enter a valid email address.", "error");
      }
    });
  }

  // Resource Download Tracking
  const resourceLinks = document.querySelectorAll(".resource-item .btn");
  resourceLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const resourceName = this.parentNode.querySelector("h4").textContent;
      console.log("Resource downloaded:", resourceName);
      // Track resource downloads (analytics placeholder)
    });
  });

  // Article Read More Tracking
  const readMoreLinks = document.querySelectorAll(".read-more");
  readMoreLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const articleTitle = this.parentNode.querySelector("h3").textContent;
      console.log("Article read:", articleTitle);
      // Track article reads (analytics placeholder)
    });
  });
});

// Add CSS for additional functionality
const additionalStyles = `
    .form-message {
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        font-weight: 500;
    }
    
    .form-message-success {
        background-color: #d1fae5;
        color: #065f46;
        border: 1px solid #a7f3d0;
    }
    
    .form-message-error {
        background-color: #fee2e2;
        color: #991b1b;
        border: 1px solid #fca5a5;
    }
    
    .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #1e3a8a;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
    }
    
    .skip-link:focus {
        top: 6px;
    }
    
    .header.scrolled {
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .nav.active {
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        padding: 1rem;
    }
    
    .nav.active .nav-list {
        flex-direction: column;
        gap: 1rem;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .dropdown-menu.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .form-group.focused label {
        color: #1e3a8a;
    }
`;

// Inject additional styles
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
