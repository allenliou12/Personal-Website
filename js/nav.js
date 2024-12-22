document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('navbar-toggle');
  const navbarMenu = document.getElementById('navbar-menu');

  toggleButton.addEventListener('click', function () {
    navbarMenu.classList.toggle('active'); // Toggle the active class
  });
});