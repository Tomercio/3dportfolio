/**
 * Utility functions for smooth scrolling
 */

/**
 * Scrolls to a specific element with a smooth animation
 * @param {string} elementId - The ID of the element to scroll to
 * @param {number} offset - Optional offset from the top in pixels (default: 0)
 * @param {number} duration - Animation duration in milliseconds (default: 800)
 */
export const scrollToElement = (elementId, offset = 0, duration = 800) => {
    const element = document.getElementById(elementId);
    
    if (!element) {
      console.warn(`Element with ID "${elementId}" not found.`);
      return;
    }
    
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeInOutCubic = progress => 
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  };
  
  /**
   * Sets up smooth scrolling for all anchor links with hash references
   * @param {number} offset - Optional offset from the top in pixels (default: 80)
   */
  export const setupSmoothScrolling = (offset = 80) => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').slice(1);
        if (targetId) {
          scrollToElement(targetId, offset);
          
          // Update URL hash without scrolling
          window.history.pushState(null, null, `#${targetId}`);
        }
      });
    });
  };
  
  export default {
    scrollToElement,
    setupSmoothScrolling
  };