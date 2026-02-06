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
      toggleBtn.innerHTML = '🟣'; // Purple circle for neon mode
      toggleBtn.title = 'Switch to Light Mode';
    } else {
      toggleBtn.innerHTML = '☀️'; // Sun for light mode
      toggleBtn.title = 'Switch to Neon Purple Mode';
    }
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
  };

  /**
   * Initialize interactive project preview popups
   */
  const initProjectPreviews = () => {
    const cards = document.querySelectorAll('.projects_cards');
    let popup = document.getElementById('project-preview-popup');
    let hoverTimeout;

    // Create popup if it doesn't exist
    if (!popup) {
      popup = document.createElement('div');
      popup.id = 'project-preview-popup';
      document.body.appendChild(popup);
    }

    const showPopup = (card, data) => {
      const rect = card.getBoundingClientRect();
      const images = data.images.split(',');
      const techs = data.techs.split(',');
      let currentSlide = 0;

      // Build popup content
      popup.innerHTML = `
        <div class="preview-slider">
          <div class="preview-slides-container">
            ${images.map((img) => `<div class="preview-slide"><img src="${img.trim()}" alt="Preview"></div>`).join('')}
          </div>
          ${
            images.length > 1
              ? `
            <button class="slider-btn prev-btn">&larr;</button>
            <button class="slider-btn next-btn">&rarr;</button>
          `
              : ''
          }
        </div>
        <div class="preview-content">
          <h2 class="preview-title">${card.querySelector('h3').textContent}</h2>
          <p class="preview-description">${data.description}</p>
          <div class="preview-tech-list">
            ${techs.map((tech) => `<span class="tech-badge">${tech.trim()}</span>`).join('')}
          </div>
        </div>
      `;

      // Position popup
      const popupWidth = 450;
      const popupHeight = popup.offsetHeight; // This might be 0 initially

      let left = rect.left + rect.width / 2 - popupWidth / 2;
      let top = rect.top - 20; // Default above

      // Adjust if off-screen
      if (left < 20) left = 20;
      if (left + popupWidth > window.innerWidth - 20)
        left = window.innerWidth - popupWidth - 20;

      // If not enough space above, show below
      // (Temporary fixed height for initial placement logic)
      const estimatedHeight = 500;
      if (rect.top < estimatedHeight) {
        top = rect.bottom + 20;
        popup.style.transformOrigin = 'top center';
      } else {
        top = rect.top - estimatedHeight - 10;
        popup.style.transformOrigin = 'bottom center';
      }

      popup.style.left = `${left}px`;
      popup.style.top = `${top}px`;
      popup.classList.add('show');

      // Slider Logic
      const container = popup.querySelector('.preview-slides-container');
      const updateSlider = () => {
        container.style.transform = `translateX(-${currentSlide * 100}%)`;
      };

      if (images.length > 1) {
        popup.querySelector('.prev-btn').onclick = (e) => {
          e.preventDefault();
          currentSlide = (currentSlide - 1 + images.length) % images.length;
          updateSlider();
        };
        popup.querySelector('.next-btn').onclick = (e) => {
          e.preventDefault();
          currentSlide = (currentSlide + 1) % images.length;
          updateSlider();
        };
      }
    };

    const hidePopup = () => {
      popup.classList.remove('show');
    };

    cards.forEach((card) => {
      const data = {
        description: card.getAttribute('data-description'),
        images: card.getAttribute('data-images'),
        techs: card.getAttribute('data-techs'),
      };

      if (!data.description) return; // Skip if no detailed info

      card.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => showPopup(card, data), 300);
      });

      card.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout);
        // Delay hide slightly to allow moving mouse to popup
        hoverTimeout = setTimeout(hidePopup, 100);
      });
    });

    // Keep popup open when hovering over it
    popup.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
    });

    popup.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(hidePopup, 100);
    });
  };

  // Initialize
  initTheme();
  document.addEventListener('componentsLoaded', initComponentsLogic);
})();
