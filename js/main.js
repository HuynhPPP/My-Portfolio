/**
 * Main application logic
 */
(function () {
  // 1. Theme Logic (Runs immediately as it depends on index.html elements)
  const initTheme = () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'neon-purple') {
      body.classList.add('neon-purple-tech');
    }

    // Update button appearance on load
    updateThemeToggleBtn(savedTheme);

    if (toggleBtn) {
      // Toggle between themes: light -> neon-purple -> light
      toggleBtn.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        let newTheme;

        if (currentTheme === 'light') {
          newTheme = 'neon-purple';
          body.classList.add('neon-purple-tech');
        } else {
          newTheme = 'light';
          body.classList.remove('neon-purple-tech');
        }

        localStorage.setItem('theme', newTheme);

        // Update theme toggle button appearance
        updateThemeToggleBtn(newTheme);
      });
    }
  };

  // Update theme toggle button appearance
  const updateThemeToggleBtn = (theme) => {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    // Update button icon or text based on theme
    if (theme === 'neon-purple') {
      toggleBtn.innerHTML = '🔵'; // Cyan circle for ocean mode
      toggleBtn.title = 'Switch to Light Mode';
    } else {
      toggleBtn.innerHTML = '☀️'; // Sun for light mode
      toggleBtn.title = 'Switch to Dark Ocean Mode';
    }
  };

  // 1.5. Language Logic
  const initLanguage = () => {
    const langToggle = document.getElementById('lang-toggle');
    const currentLang = localStorage.getItem('lang') || 'vi';

    // Set initial language
    applyLanguage(currentLang);

    if (langToggle) {
      langToggle.addEventListener('click', () => {
        const lang = localStorage.getItem('lang') || 'vi';
        const newLang = lang === 'vi' ? 'en' : 'vi';
        applyLanguage(newLang);
      });
    }
  };

  const applyLanguage = (lang) => {
    localStorage.setItem('lang', lang);
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.textContent = lang === 'vi' ? 'VN' : 'EN';
    }

    // Update all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        if (translations[lang][key].includes('<')) {
          el.innerHTML = translations[lang][key];
        } else {
          el.textContent = translations[lang][key];
        }
      }
    });

    // Update dynamically rendered projects
    renderProjects(lang);

    // Update document language attribute
    document.documentElement.lang = lang;
  };

  const renderProjects = (lang) => {
    const grid = document.querySelector('.projects__cards_grid');
    if (!grid || !projectsData) return;

    grid.innerHTML = projectsData.map((project, index) => `
      <a href="${project.link}" target="_blank" rel="noopener noreferrer" style="--card-index: ${index}">
        <div class="projects_cards animate-on-scroll" 
          data-animation="fade-in-up-sm"
          data-description="${project.description[lang]}"
          data-images="${project.images.join(',')}"
          data-techs="${project.techs.join(',')}">
          <div class="projects__cards_wrapper">
            <img src="${project.images[0]}" alt="${project.title[lang]}" class="projects__cards_img" loading="lazy" />
          </div>
          <div class="projects__cards_titles">
            <h1>${project.category[lang]}</h1>
            <h3>${project.title[lang]}</h3>
          </div>
        </div>
      </a>
    `).join('');

    // Re-initialize project previews after rendering
    initProjectPreviews();
  };

  // 2. Components Logic (Runs after components are loaded)
  const initComponentsLogic = () => {
    // Tabs behaviour
    const tabs = document.querySelectorAll('.projects__tab');
    const container = document.querySelector('.projects__cards_container');

    if (tabs && container) {
      function setActive(filter) {
        tabs.forEach((t) => {
          const isActive = t.getAttribute('data-filter') === filter;
          t.classList.toggle('projects__tab--active', isActive);
          t.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        container.classList.remove('is-filter-personal', 'is-filter-school');
        if (filter === 'personal')
          container.classList.add('is-filter-personal');
        if (filter === 'school') container.classList.add('is-filter-school');
      }

      tabs.forEach((t) =>
        t.addEventListener('click', () =>
          setActive(t.getAttribute('data-filter'))
        )
      );
    }

    // Enhanced Scroll Animation Logic
    const initScrollAnimations = () => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');

      // Set up staggered animations for project cards
      const projectCards = document.querySelectorAll('.projects_cards');
      projectCards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
      });

      // Performance-optimized observer with multiple thresholds
      const observerOptions = {
        threshold: [0.1, 0.3, 0.6],
        rootMargin: '0px 0px -80px 0px',
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const element = entry.target;

          if (entry.isIntersecting) {
            // Get animation type from data attribute
            const animationType = element.getAttribute('data-animation') || 'fade-in-up';

            // Add animation class with performance optimization
            requestAnimationFrame(() => {
              element.classList.add(`animate-${animationType}`);

              // Add staggered animation for child elements if specified
              const staggerChildren = element.querySelectorAll('[data-stagger]');
              staggerChildren.forEach((child, index) => {
                const delay = (index + 1) * 100;
                setTimeout(() => {
                  child.classList.add('animate-stagger-reveal');
                }, delay);
              });

              // Special handling for project cards grid
              if (element.classList.contains('projects__cards_grid')) {
                const cards = element.querySelectorAll('.projects_cards');
                cards.forEach((card, index) => {
                  setTimeout(() => {
                    card.classList.add('animate-fade-in-up-sm');
                  }, index * 100);
                });
              }
            });

            // Remove from observer after animation
            setTimeout(() => {
              observer.unobserve(element);
            }, 1000);
          }
        });
      }, observerOptions);

      // Observe all elements with initial delay for performance
      setTimeout(() => {
        animatedElements.forEach((el) => observer.observe(el));
      }, 100);
    };

    // Parallax scroll effect for specific elements
    const initParallaxEffects = () => {
      const parallaxElements = document.querySelectorAll('[data-parallax]');

      const updateParallax = () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach((element) => {
          const speed = element.getAttribute('data-parallax') || 0.5;
          const yPos = -(scrolled * speed);
          element.style.transform = `translateY(${yPos}px) translateZ(0)`;
        });
      };

      // Throttled scroll event for performance
      let ticking = false;
      const requestTick = () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
          setTimeout(() => { ticking = false; }, 16);
        }
      };

      window.addEventListener('scroll', requestTick);
      updateParallax(); // Initial call
    };

    // Progress indicator for sections
    const initScrollProgress = () => {
      const sections = document.querySelectorAll('section[id]');
      const progressBars = document.querySelectorAll('[data-scroll-progress]');

      const updateProgress = () => {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Update overall progress
        const overallProgress = scrolled / (documentHeight - windowHeight);
        progressBars.forEach(bar => {
          bar.style.transform = `scaleX(${overallProgress})`;
        });

        // Update active section
        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          const isActive = rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5;

          if (isActive) {
            // Update navigation or other indicators
            const navLinks = document.querySelectorAll(`[href="#${section.id}"]`);
            navLinks.forEach(link => link.classList.add('active'));
          } else {
            const navLinks = document.querySelectorAll(`[href="#${section.id}"]`);
            navLinks.forEach(link => link.classList.remove('active'));
          }
        });
      };

      // Throttled scroll event
      let ticking = false;
      const requestTick = () => {
        if (!ticking) {
          requestAnimationFrame(updateProgress);
          ticking = true;
          setTimeout(() => { ticking = false; }, 16);
        }
      };

      window.addEventListener('scroll', requestTick);
      updateProgress(); // Initial call
    };

    // Initialize all animation systems
    initScrollAnimations();
    initParallaxEffects();
    initScrollProgress();

    // Project Previews Logic
    initProjectPreviews();

    // Contact Component Logic
    initContactComponent();
  };

  /**
   * Initialize interactive project preview popups
   */
  const initProjectPreviews = () => {
    const cards = document.querySelectorAll('.projects_cards');
    let popup = document.getElementById('project-preview-popup');
    let backdrop = document.getElementById('project-preview-backdrop');

    // Create backdrop if it doesn't exist
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'project-preview-backdrop';
      document.body.appendChild(backdrop);
    }

    // Create popup if it doesn't exist
    if (!popup) {
      popup = document.createElement('div');
      popup.id = 'project-preview-popup';
      document.body.appendChild(popup);
    }

    const showPopup = (card, link) => {
      // Read data fresh from DOM at click time → always reflects current language after re-render
      const lang = localStorage.getItem('lang') || 'vi';
      const imagesRaw = card.getAttribute('data-images') || '';
      const techsRaw = card.getAttribute('data-techs') || '';
      const description = card.getAttribute('data-description') || '';
      const images = imagesRaw ? imagesRaw.split(',') : [];
      const techs = techsRaw ? techsRaw.split(',') : [];
      let currentSlide = 0;

      if (images.length === 0) return;

      const visitLabel = lang === 'vi' ? 'Xem website' : 'Visit website';
      const title = card.querySelector('h3') ? card.querySelector('h3').textContent : '';

      // Build popup content
      popup.innerHTML = `
        <button class="preview-close-btn" aria-label="Close">&times;</button>
        <div class="preview-slider">
          <div class="preview-slides-container">
            ${images.map((img) => `<div class="preview-slide"><img src="${img.trim()}" alt="Preview" loading="lazy"></div>`).join('')}
          </div>
          ${images.length > 1
            ? `
            <button class="slider-btn prev-btn" aria-label="Previous">&larr;</button>
            <button class="slider-btn next-btn" aria-label="Next">&rarr;</button>
          `
            : ''
          }
        </div>
        <div class="preview-content">
          <h2 class="preview-title">${title}</h2>
          <p class="preview-description">${description}</p>
          <div class="preview-tech-list">
            ${techs.map((tech) => `<span class="tech-badge">${tech.trim()}</span>`).join('')}
          </div>
          <div class="preview-actions">
            <a href="${link}" target="_blank" rel="noopener noreferrer" class="preview-visit-btn">${visitLabel}</a>
          </div>
        </div>
      `;

      // Position popup fully centered (Modal style)
      // We let the CSS handle the standard transform and positioning for modal.
      // But we need to ensure it overrides any previous element-based positioning.
      popup.style.left = '50%';
      popup.style.top = '50%';
      popup.style.transform = 'translate(-50%, -50%)';
      popup.style.transformOrigin = 'center center'; // Override absolute placement origin

      // Show
      backdrop.classList.add('show');
      popup.classList.add('show');
      document.body.style.overflow = 'hidden'; // Lock scroll

      // Slider Logic
      const container = popup.querySelector('.preview-slides-container');
      const updateSlider = () => {
        container.style.transform = `translateX(-${currentSlide * 100}%)`;
      };

      if (images.length > 1) {
        const prevBtn = popup.querySelector('.prev-btn');
        const nextBtn = popup.querySelector('.next-btn');

        if (prevBtn) {
          prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentSlide = (currentSlide - 1 + images.length) % images.length;
            updateSlider();
          });
        }

        if (nextBtn) {
          nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentSlide = (currentSlide + 1) % images.length;
            updateSlider();
          });
        }
      }

      // Handle close inside content click if needed, but handled by global listener
    };

    const hidePopup = () => {
      popup.classList.remove('show');
      backdrop.classList.remove('show');
      document.body.style.overflow = ''; // Restore scroll
    };

    cards.forEach((card) => {
      const parentLink = card.closest('a');
      const link = parentLink ? parentLink.getAttribute('href') : '#';

      // Skip cards that have no preview data
      if (!card.getAttribute('data-description')) return;

      // Handle click instead of hover
      if (parentLink) {
        parentLink.addEventListener('click', (e) => {
          e.preventDefault(); // Stop navigation
          showPopup(card, link);
        });
      } else {
        card.addEventListener('click', () => {
          showPopup(card, '#');
        });
      }
    });

    // Close on backdrop click — use replaceWith trick to remove old listeners
    const newBackdrop = backdrop.cloneNode(true);
    backdrop.parentNode.replaceChild(newBackdrop, backdrop);
    backdrop = newBackdrop;
    backdrop.addEventListener('click', hidePopup);

    // Close on 'X' button or general click inside popup
    popup.addEventListener('click', (e) => {
      if (e.target.classList.contains('preview-close-btn')) {
        hidePopup();
      }
    });

    // Keydown close support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popup.classList.contains('show')) {
        hidePopup();
      }
    });
  };

  /**
   * Initialize contact component
   */
  const initContactComponent = () => {
    // Add smooth scrolling for contact links
    const contactLinks = document.querySelectorAll('.contact__link');
    contactLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Smooth scroll to top for contact section
        if (link.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // Add hover effects for contact methods
    const contactMethods = document.querySelectorAll('.contact__method');
    contactMethods.forEach(method => {
      method.addEventListener('mouseenter', () => {
        method.style.transform = 'translateY(-4px) scale(1.02)';
      });

      method.addEventListener('mouseleave', () => {
        method.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Add ripple effect to contact buttons
    const contactButtons = document.querySelectorAll('.contact__btn');
    contactButtons.forEach(btn => {
      btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Re-apply language after components are loaded
    const currentLang = localStorage.getItem('lang') || 'vi';
    applyLanguage(currentLang);
  };

  // Initialize
  initTheme();
  initLanguage();
  document.addEventListener('componentsLoaded', initComponentsLogic);
})();
