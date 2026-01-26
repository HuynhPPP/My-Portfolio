/**
 * Main application logic
 */
(function () {
  // 1. Dark Mode Logic (Runs immediately as it depends on index.html elements)
  const initTheme = () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem(
          'theme',
          body.classList.contains('dark-mode') ? 'dark' : 'light'
        );
      });
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

    // Scroll Animation Logic
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animationType =
            entry.target.getAttribute('data-animation') || 'fade-in-up';
          entry.target.classList.add(`animate-${animationType}`);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach((el) => observer.observe(el));

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
