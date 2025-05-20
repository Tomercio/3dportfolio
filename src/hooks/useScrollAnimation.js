import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Custom hook for scroll-triggered animations using Framer Motion
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Visibility threshold (0-1) to trigger animation
 * @param {boolean} options.triggerOnce - Whether to trigger only once
 * @param {number} options.rootMargin - Root margin for intersection observer
 * @returns {Array} - [inViewRef, controls, inView] to be used with framer-motion
 */
export const useScrollAnimation = ({
  threshold = 0.2,
  triggerOnce = true,
  rootMargin = '0px',
} = {}) => {
  // Setup animation controls
  const controls = useAnimation();
  
  // Setup intersection observer
  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
    rootMargin,
  });
  
  // Start animation when element is in view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!triggerOnce) {
      controls.start('hidden');
    }
  }, [controls, inView, triggerOnce]);
  
  return [ref, controls, inView];
};

export default useScrollAnimation;