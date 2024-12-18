// Move the TypeWriter class definition outside of DOMContentLoaded
class TypeWriter {
  constructor(element, phrases = null, options = {}) {
    this.element = element;
    this.phrases = phrases;
    this.isActive = true;

    if (phrases) {
      // Multi-phrase mode
      this.opts = {
        typeSpeed: options.typeSpeed || 60,
        deleteSpeed: options.deleteSpeed || 50,
        pauseBetween: options.pauseBetween || 2000
      };

      this.phraseIndex = 0;
      this.charIndex = 0;
      this.isDeleting = false;
      this.type();
    } else {
      // Single text mode
      this.text = element.textContent.trim();
      element.textContent = '';

      this.opts = {
        typeSpeed: options.typeSpeed || 50,
        deleteSpeed: options.deleteSpeed || 30,
        pauseBetween: options.pauseBetween || 2000,
        infinite: options.infinite || false
      };

      this.charIndex = 0;
      this.isDeleting = false;
      this.typeSingleText();
    }
  }

  stop() {
    this.isActive = false;
    this.element.textContent = '';
  }

  typeSingleText() {
    if (!this.isActive) return;

    const fullText = this.text;

    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    this.element.textContent = fullText.substring(0, this.charIndex);

    let typeSpeed = this.opts.typeSpeed;

    if (!this.isDeleting && this.charIndex === fullText.length) {
      if (this.opts.infinite) {
        typeSpeed = this.opts.pauseBetween;
        this.isDeleting = true;
      } else {
        return;
      }
    }

    if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
    }

    if (this.isActive) {
      setTimeout(() => this.typeSingleText(), typeSpeed);
    }
  }

  type() {
    if (!this.isActive) return;

    const current = this.phraseIndex % this.phrases.length;
    const fullText = this.phrases[current];

    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    this.element.textContent = fullText.substring(0, this.charIndex);

    let typeSpeed = this.opts.typeSpeed;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.charIndex === fullText.length) {
      typeSpeed = this.opts.pauseBetween;
      this.isDeleting = true;
    }

    if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex++;
    }

    if (this.isActive) {
      setTimeout(() => this.type(), typeSpeed);
    }
  }
}

// Then wrap the initialization code in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Hero Title Animation
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    new TypeWriter(heroTitle, null, {
      typeSpeed: 100,
      pauseBetween: 0,
      infinite: false
    });
  }

  // Hero Description Animation
  const heroDescription = document.querySelector('.hero__description');
  if (heroDescription) {
    setTimeout(() => {
      new TypeWriter(heroDescription, null, {
        typeSpeed: 10,
        pauseBetween: 0,
        infinite: false
      });
    }); // Delay to start after title and subtitle
  }

  // Subtitle with Multiple Phrases
  const typewriterElement = document.getElementById('typewriter-text');
  if (typewriterElement) {
    new TypeWriter(typewriterElement, [
      'Full Stack Developer',
      'Python Enthusiast',
      'Machine Learning Explorer'
    ]);
  }
});