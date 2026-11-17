/**
 * ==============================================================================
 * PORTFOLIO APPLICATION LOGIC (script.js)
 * ==============================================================================
 * Handles dynamic content population from content.js, typewriter animations,
 * scroll reveals, interactive timeline drawing, navbar state, and mobile menu.
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Verify content.js is loaded
  const data = window.siteContent || (typeof siteContent !== "undefined" ? siteContent : null);

  if (!data) {
    console.error("Portfolio Error: siteContent object not found. Please ensure content.js is loaded before script.js.");
    return;
  }

  // Check user accessibility preference for reduced motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ----------------------------------------------------------------------------
  // Helper: Extract Initials from Name
  // ----------------------------------------------------------------------------
  function getInitials(name) {
    if (!name) return "AA";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  // ----------------------------------------------------------------------------
  // 2. Populate Dynamic Content from content.js
  // ----------------------------------------------------------------------------
  function renderSiteContent() {
    const initials = getInitials(data.name);

    // Update document title & meta
    document.title = `${data.name} | ${data.role || "WordPress Developer"}`;

    // Navbar Brand Photo & Name
    const navName = document.getElementById("nav-name");
    const navAvatar = document.getElementById("nav-avatar");
    if (navName) navName.textContent = data.name;

    if (navAvatar) {
      if (data.photo && data.photo.trim() !== "") {
        const navImg = document.createElement("img");
        navImg.src = data.photo;
        navImg.alt = data.name;
        navImg.className = "brand-avatar-img";
        navImg.loading = "eager";

        navImg.onerror = () => {
          navAvatar.innerHTML = `<span class="brand-monogram">${initials}</span>`;
        };

        navAvatar.innerHTML = "";
        navAvatar.appendChild(navImg);
      } else {
        navAvatar.innerHTML = `<span class="brand-monogram">${initials}</span>`;
      }
    }

    // --- HERO SECTION ---
    // Profile Photo with Robust Fallback
    const photoFrame = document.getElementById("hero-photo-frame");
    if (photoFrame) {
      if (data.photo && data.photo.trim() !== "") {
        let img = photoFrame.querySelector("img.profile-img");
        if (!img) {
          img = document.createElement("img");
          img.className = "profile-img";
          img.loading = "eager";
          img.fetchPriority = "high";
          photoFrame.innerHTML = "";
          photoFrame.appendChild(img);
        }
        img.src = data.photo;
        img.alt = data.name || "Profile Photo";

        // If photo fails to load or path is invalid, render the initials fallback circle
        img.onerror = () => {
          renderInitialsFallback(photoFrame, initials);
        };
      } else {
        renderInitialsFallback(photoFrame, initials);
      }
    }

    // Location Badge
    const locationBadge = document.getElementById("hero-location-pill");
    const locationText = document.getElementById("hero-location-text");
    if (locationBadge && locationText) {
      if (data.location && data.location.trim() !== "") {
        locationText.textContent = data.location;
      } else {
        locationBadge.style.display = "none";
      }
    }

    // Hero Name
    const heroName = document.getElementById("hero-name");
    if (heroName) heroName.textContent = data.name;

    // Hero Tagline
    const heroTagline = document.getElementById("hero-tagline");
    if (heroTagline) heroTagline.textContent = data.tagline;

    // --- ABOUT SECTION ---
    // Section Title
    const aboutTitle = document.getElementById("about-title");
    if (aboutTitle) aboutTitle.textContent = data.aboutTitle || "About Me";

    // About Paragraphs
    const paragraphsContainer = document.getElementById("about-paragraphs");
    if (paragraphsContainer && Array.isArray(data.about)) {
      paragraphsContainer.innerHTML = "";
      data.about.forEach((paraText, index) => {
        const p = document.createElement("p");
        p.className = `about-paragraph reveal reveal-delay-${(index % 3) + 1}`;
        p.textContent = paraText;
        paragraphsContainer.appendChild(p);
      });
    }

    // Skills Pill Tags
    const skillsContainer = document.getElementById("skills-list");
    if (skillsContainer && Array.isArray(data.skills)) {
      skillsContainer.innerHTML = "";
      data.skills.forEach((skillText) => {
        const pill = document.createElement("span");
        pill.className = "skill-pill";

        const bullet = document.createElement("span");
        bullet.className = "skill-pill-bullet";
        bullet.setAttribute("aria-hidden", "true");

        const text = document.createTextNode(skillText);

        pill.appendChild(bullet);
        pill.appendChild(text);
        skillsContainer.appendChild(pill);
      });
    }

    // --- EXPERIENCE SECTION ---
    const experienceContainer = document.getElementById("experience-timeline");
    if (experienceContainer && Array.isArray(data.experience)) {
      experienceContainer.innerHTML = "";
      data.experience.forEach((item, index) => {
        const itemEl = document.createElement("div");
        itemEl.className = `timeline-item reveal reveal-delay-${(index % 2) + 1}`;
        itemEl.dataset.index = index;

        // Timeline Node
        const node = document.createElement("div");
        node.className = "timeline-node";
        node.setAttribute("aria-hidden", "true");

        // Experience Card
        const card = document.createElement("div");
        card.className = "experience-card";

        const header = document.createElement("div");
        header.className = "experience-header";

        const role = document.createElement("h3");
        role.className = "experience-role";
        role.textContent = item.role || "Developer";

        const meta = document.createElement("div");
        meta.className = "experience-meta";

        const company = document.createElement("span");
        company.className = "experience-company";
        company.textContent = item.company || "";

        const duration = document.createElement("span");
        duration.className = "experience-badge";
        duration.textContent = item.duration || "";

        meta.appendChild(company);
        meta.appendChild(duration);

        header.appendChild(role);
        header.appendChild(meta);

        const desc = document.createElement("p");
        desc.className = "experience-description";
        desc.textContent = item.description || "";

        card.appendChild(header);
        card.appendChild(desc);

        itemEl.appendChild(node);
        itemEl.appendChild(card);

        experienceContainer.appendChild(itemEl);
      });
    }

    // --- CONTACT SECTION ---
    const contactContainer = document.getElementById("contact-container");
    if (contactContainer && data.contact) {
      contactContainer.innerHTML = "";

      // Phone Card
      if (data.contact.phone) {
        const phoneCard = document.createElement("a");
        // Sanitize for tel: protocol link
        const cleanPhone = data.contact.phone.replace(/[^0-9+]/g, "");
        phoneCard.href = `tel:${cleanPhone || data.contact.phone}`;
        phoneCard.className = "contact-card reveal reveal-delay-1";
        phoneCard.setAttribute("aria-label", `Call phone number ${data.contact.phone}`);

        phoneCard.innerHTML = `
          <div class="contact-icon-wrapper" aria-hidden="true">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <div class="contact-details">
            <span class="contact-label">Phone</span>
            <span class="contact-value">${escapeHtml(data.contact.phone)}</span>
          </div>
        `;
        contactContainer.appendChild(phoneCard);
      }

      // Email Card
      if (data.contact.email) {
        const emailCard = document.createElement("a");
        emailCard.href = `mailto:${data.contact.email}`;
        emailCard.className = "contact-card reveal reveal-delay-2";
        emailCard.setAttribute("aria-label", `Send email to ${data.contact.email}`);

        emailCard.innerHTML = `
          <div class="contact-icon-wrapper" aria-hidden="true">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <div class="contact-details">
            <span class="contact-label">Email</span>
            <span class="contact-value">${escapeHtml(data.contact.email)}</span>
          </div>
        `;
        contactContainer.appendChild(emailCard);
      }
    }

    // --- FOOTER SECTION ---
    const footerName = document.getElementById("footer-name");
    const footerCopyrightName = document.getElementById("footer-copyright-name");
    const footerYear = document.getElementById("footer-year");

    if (footerName) footerName.textContent = data.name;
    if (footerCopyrightName) footerCopyrightName.textContent = data.name;
    if (footerYear) footerYear.textContent = new Date().getFullYear();
  }

  // Render initials circle when image fails to load
  function renderInitialsFallback(container, initials) {
    container.innerHTML = "";
    const fallback = document.createElement("div");
    fallback.className = "avatar-initials-fallback";
    fallback.setAttribute("role", "img");
    fallback.setAttribute("aria-label", `Avatar initials for ${data.name}`);
    fallback.textContent = initials;
    container.appendChild(fallback);
  }

  // Safe HTML string escape helper
  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ----------------------------------------------------------------------------
  // 3. Hero Typewriter Animation for Role
  // ----------------------------------------------------------------------------
  function initTypewriter() {
    const roleElement = document.getElementById("hero-role");
    if (!roleElement) return;

    const fullText = data.role || "WordPress Developer";

    if (prefersReducedMotion) {
      roleElement.textContent = fullText;
      return;
    }

    roleElement.textContent = "";
    let charIndex = 0;
    const typingSpeed = 65; // ms per character

    function typeCharacter() {
      if (charIndex < fullText.length) {
        roleElement.textContent += fullText.charAt(charIndex);
        charIndex++;
        setTimeout(typeCharacter, typingSpeed);
      }
    }

    // Start typing after a short initial pause for smooth entrance
    setTimeout(typeCharacter, 450);
  }

  // ----------------------------------------------------------------------------
  // 4. Scroll Reveal Animations (IntersectionObserver)
  // ----------------------------------------------------------------------------
  function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal");

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((el) => el.classList.add("revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  // ----------------------------------------------------------------------------
  // 5. Dynamic Experience Timeline Line Scroll Draw
  // ----------------------------------------------------------------------------
  function initTimelineScrollDraw() {
    const timelineWrapper = document.querySelector(".timeline-wrapper");
    const lineFill = document.getElementById("timeline-line-fill");
    const items = document.querySelectorAll(".timeline-item");

    if (!timelineWrapper || !lineFill) return;

    if (prefersReducedMotion) {
      lineFill.style.height = "100%";
      items.forEach((item) => item.classList.add("active-node"));
      return;
    }

    let ticking = false;

    function updateTimeline() {
      const rect = timelineWrapper.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start drawing when the top of the timeline is halfway into view
      const startTrigger = windowHeight * 0.75;
      const endTrigger = windowHeight * 0.25;

      const timelineTop = rect.top;
      const timelineHeight = rect.height;

      if (timelineTop < startTrigger && timelineHeight > 0) {
        const scrolledDistance = startTrigger - timelineTop;
        const totalDistance = timelineHeight + (startTrigger - endTrigger);
        let progress = (scrolledDistance / totalDistance) * 100;

        progress = Math.max(0, Math.min(100, progress));
        lineFill.style.height = `${progress}%`;

        // Activate dot node when the drawn line reaches each card
        const lineAbsoluteBottom = lineFill.getBoundingClientRect().bottom;
        items.forEach((item) => {
          const node = item.querySelector(".timeline-node");
          if (node) {
            const nodeRect = node.getBoundingClientRect();
            if (lineAbsoluteBottom >= nodeRect.top + nodeRect.height / 2) {
              item.classList.add("active-node");
            } else {
              item.classList.remove("active-node");
            }
          }
        });
      } else if (timelineTop >= startTrigger) {
        lineFill.style.height = "0%";
        items.forEach((item) => item.classList.remove("active-node"));
      }

      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateTimeline);
          ticking = true;
        }
      },
      { passive: true }
    );

    // Initial check
    updateTimeline();
  }

  // ----------------------------------------------------------------------------
  // 6. Sticky Navbar Scrolled State & Active Section ScrollSpy
  // ----------------------------------------------------------------------------
  function initNavbar() {
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    function onScroll() {
      // 1. Navbar background solid on scroll
      if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      // 2. Active Section ScrollSpy
      let currentSectionId = "";
      const scrollPosition = window.scrollY + 140;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute("id");
        }
      });

      // Special case: at bottom of the page, activate contact
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        currentSectionId = "contact";
      }

      if (currentSectionId) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
          }
        });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Run once at start
  }

  // ----------------------------------------------------------------------------
  // 7. Mobile Navigation Drawer & Hamburger Toggle
  // ----------------------------------------------------------------------------
  function initMobileMenu() {
    const toggleBtn = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!toggleBtn || !navMenu) return;

    function openMenu() {
      navMenu.classList.add("open");
      toggleBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden"; // Prevent scrolling behind menu on mobile
    }

    function closeMenu() {
      navMenu.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    toggleBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.contains("open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // Close on click outside navbar
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(e.target) &&
        !toggleBtn.contains(e.target)
      ) {
        closeMenu();
      }
    });

    // Close on ESC key press
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        closeMenu();
        toggleBtn.focus();
      }
    });
  }

  // ----------------------------------------------------------------------------
  // 8. Execute All Initialization Functions
  // ----------------------------------------------------------------------------
  renderSiteContent();
  initTypewriter();
  initScrollReveal();
  initTimelineScrollDraw();
  initNavbar();
  initMobileMenu();
});
