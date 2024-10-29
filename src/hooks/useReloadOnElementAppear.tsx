import { useEffect } from 'react';

// Custom Hook
const useReloadOnElementAppear = (elementSelector) => {
  useEffect(() => {
    const callback = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const targetElement = document.querySelector(elementSelector);
          if (targetElement) {
            console.log('Element detected! Reloading page...');
            window.location.reload();
          }
        }
      }
    };

    const observer = new MutationObserver(callback);

    // Observe changes in the DOM
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [elementSelector]); // Re-run if elementSelector changes
};

export default useReloadOnElementAppear;