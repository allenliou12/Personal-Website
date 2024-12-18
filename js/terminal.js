document.addEventListener('DOMContentLoaded', () => {
  const terminal = document.querySelector('.terminal-window');
  const content = document.querySelector('.terminal-content');
  const command = document.getElementById('terminal-command');
  const textContainer = document.querySelector('.about__text-container');
  const outputs = document.querySelectorAll('.about__text');
  let isAnimating = false;
  let activeTypewriters = [];
  let allTimeouts = [];

  // Store the original text content
  const aboutTexts = [
    "I'm a Software Engineer with a unique background in Real Estate, combining technical expertise with practical industry experience. My Masters in Information Technology (CGPA: 3.79) and experience in property portfolio management give me a distinctive approach to problem-solving.",
    "Currently, I'm passionate about building scalable applications and exploring AI solutions, particularly through my Machine Learning Fashion Recommendation System project."
  ];

  // Function to completely reset everything
  const forceReset = () => {
    console.log('Force reset called');
    // Clear all timeouts
    allTimeouts.forEach(timeout => clearTimeout(timeout));
    allTimeouts = [];

    // Stop all typewriters
    activeTypewriters.forEach(typewriter => {
      console.log('Stopping typewriter:', typewriter);
      if (typewriter && typewriter.stop) {
        typewriter.stop();
      }
    });
    activeTypewriters = [];

    // Reset all elements
    command.textContent = '';
    command.classList.remove('typed');
    textContainer.classList.add('hidden');
    outputs.forEach(output => {
      output.textContent = '';
      output.classList.remove('typing', 'finished');
    });

    // Reset states
    isAnimating = false;
    content.classList.remove('active');
    console.log('Reset complete');
  };

  terminal.addEventListener('click', () => {
    console.log('Terminal clicked, isAnimating:', isAnimating);

    // If animation is running, reset everything
    if (isAnimating) {
      forceReset();
      return;
    }

    // Start new animation
    isAnimating = true;
    content.classList.add('active');

    // Type command
    command.textContent = 'cat about.txt';
    command.classList.remove('typed');
    const commandTypewriter = new TypeWriter(command, null, {
      typeSpeed: 50,
      pauseBetween: 0,
      infinite: false
    });
    activeTypewriters.push(commandTypewriter);
    console.log('Command typewriter started');

    // Command completion
    const commandDuration = 'cat about.txt'.length * 50;
    allTimeouts.push(setTimeout(() => {
      command.classList.add('typed');
      textContainer.classList.remove('hidden');

      // Type paragraphs
      outputs.forEach((output, index) => {
        allTimeouts.push(setTimeout(() => {
          console.log('Starting paragraph', index + 1);
          if (index > 0) {
            outputs[index - 1].classList.remove('typing');
          }

          output.classList.add('typing');
          output.textContent = aboutTexts[index];
          const typewriter = new TypeWriter(output, null, {
            typeSpeed: 10,
            pauseBetween: 0,
            infinite: false
          });
          activeTypewriters.push(typewriter);

          // Paragraph completion
          const textDuration = aboutTexts[index].length * 10;
          allTimeouts.push(setTimeout(() => {
            if (index === outputs.length - 1) {
              console.log('Animation complete');
              output.classList.remove('typing');
              output.classList.add('finished');
              isAnimating = false;
            }
          }, textDuration));
        }, 1000 * (index + 1)));
      });
    }, commandDuration));
  });
});