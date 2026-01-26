/**
 * Loader utility to fetch and inject HTML components
 */
document.addEventListener('DOMContentLoaded', () => {
  const components = [
    { id: 'header-placeholder', path: 'components/header.html' },
    { id: 'about-me-placeholder', path: 'components/about-me.html' },
    { id: 'skills-placeholder', path: 'components/skills.html' },
    { id: 'projects-placeholder', path: 'components/projects.html' },
    { id: 'footer-placeholder', path: 'components/footer.html' },
  ];

  const loadComponent = async (component) => {
    try {
      const response = await fetch(component.path);
      if (!response.ok) throw new Error(`Failed to load ${component.path}`);
      const html = await response.text();
      document.getElementById(component.id).innerHTML = html;
    } catch (error) {
      console.error(error);
    }
  };

  // Load all components and then initialize scripts
  Promise.all(components.map(loadComponent)).then(() => {
    // Dispatch a custom event when all components are loaded
    document.dispatchEvent(new CustomEvent('componentsLoaded'));
  });
});
