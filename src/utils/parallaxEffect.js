document.addEventListener('DOMContentLoaded', () => {
  const parallaxElements = document.querySelectorAll('.parallax-bg');
  
  const handleParallax = () => {
    const scrollPosition = window.scrollY;
    
    parallaxElements.forEach(element => {
      // Create a slower scroll effect for the background
      const speed = 0.5;
      const yPos = -(scrollPosition * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  };
  
  // Initialize on load
  handleParallax();
  
  // Update on scroll
  window.addEventListener('scroll', handleParallax);
  
  // Handle resize events
  window.addEventListener('resize', handleParallax);
});

// Create a floating animation for background elements
const createFloatingAnimation = (element, amplitude = 15, period = 5000) => {
  let startPosition = 0;
  let startTime = Date.now();
  
  const animate = () => {
    const now = Date.now();
    const elapsed = now - startTime;
    const offset = amplitude * Math.sin((elapsed / period) * (2 * Math.PI));
    
    element.style.transform = `translateY(${startPosition + offset}px)`;
    requestAnimationFrame(animate);
  };
  
  animate();
};

const parallaxEffect = {
  init: () => {
    document.addEventListener('DOMContentLoaded', () => {
      // Initialize any floating elements
      const floatingElements = document.querySelectorAll('.floating-element');
      floatingElements.forEach(element => {
        const amplitude = parseFloat(element.dataset.amplitude || 15);
        const period = parseFloat(element.dataset.period || 5000);
        createFloatingAnimation(element, amplitude, period);
      });
    });
  },
  createFloatingAnimation
};

export default parallaxEffect;