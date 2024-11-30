document.addEventListener('DOMContentLoaded', () => {
  // Get all navigation links
  const navLinks = document.querySelectorAll('a.nav__link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Get the target section id from the href
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Get header height for offset
        const headerHeight = document.querySelector('.header').offsetHeight;

        // Calculate the target position
        const targetPosition = targetSection.offsetTop - headerHeight;

        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const navMenu = document.querySelector('.nav__menu');
        if (navMenu.classList.contains('show')) {
          navMenu.classList.remove('show');
        }
      }
    });
  });
});