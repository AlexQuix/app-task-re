/**
 * Class representing a scroll manager.
 */
export default class ScrollManager {
    /**
     * Unlocks the scroll by setting the body's overflowY style property to 'visible'.
     */
    static unlockScroll() {
      document.body.style.overflowY = 'visible';
    }
  
    /**
     * Locks the scroll by setting the body's overflowY style property to 'hidden' and animating the scroll position.
     */
    static lockScroll() {
      // Lock the scroll by setting the body's overflowY style property to 'hidden'
      document.body.style.overflowY = 'hidden';
  
      // Animate the scroll position
      this.animation(() => {
        if (scrollY > 0) {
          let y = scrollY - 50;
          scrollTo(0, y);
          return true;
        }
      });
    }
  
    /**
     * Animates a function call using requestAnimationFrame.
     * @param {Function} call - The function to be animated.
     */
    static animation(call) {
      let self = this;
  
      // Call the function with requestAnimationFrame
      requestAnimationFrame(() => {
        let isAnimation = call();
  
        // If the function returns true, call it again
        if (isAnimation) {
          self.animation(call);
        }
      });
    }
}