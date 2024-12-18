document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');

  navToggle.addEventListener('click', () => {
    navList.classList.toggle('show-menu');
  });

  // Close menu when clicking a nav link
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('show-menu');
    });
  });
});