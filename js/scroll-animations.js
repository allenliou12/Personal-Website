document.addEventListener('DOMContentLoaded', function () {
  const observerOptions = {
    threshold: 0.2 // Percentage of element visibility needed to trigger animation
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element);
  });
});