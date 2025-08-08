// Debug utilities for console access
declare global {
  interface Window {
    debugPortfolio: {
      getErrors: () => any[];
      clearErrors: () => void;
      showStoredErrors: () => void;
      testError: () => void;
      checkResources: () => void;
    };
  }
}

// Debug interface
window.debugPortfolio = {
  getErrors: () => {
    const stored = localStorage.getItem('portfolio-errors');
    return stored ? JSON.parse(stored) : [];
  },
  
  clearErrors: () => {
    localStorage.removeItem('portfolio-errors');
    console.log('✅ Errors cleared');
  },
  
  showStoredErrors: () => {
    const errors = window.debugPortfolio.getErrors();
    if (errors.length > 0) {
      console.table(errors);
    } else {
      console.log('No stored errors found');
    }
  },
  
  testError: () => {
    throw new Error('Test error for debugging');
  },
  
  checkResources: () => {
    const resources = [
      { name: 'CSS', element: 'link[rel="stylesheet"]' },
      { name: 'Scripts', element: 'script[src]' },
      { name: 'Images', element: 'img[src]' }
    ];
    
    resources.forEach(resource => {
      const elements = document.querySelectorAll(resource.element);
      console.log(`${resource.name}: ${elements.length} found`);
      elements.forEach((el: any) => {
        const src = el.src || el.href;
        if (src) {
          fetch(src, { method: 'HEAD' })
            .then(response => {
              console.log(`✅ ${src} - ${response.status}`);
            })
            .catch(error => {
              console.error(`❌ ${src} - Failed to load:`, error);
            });
        }
      });
    });
  }
};

console.log('🔧 Debug utilities loaded. Use window.debugPortfolio to access debugging functions:');
console.log('- debugPortfolio.getErrors() - Get all errors');
console.log('- debugPortfolio.clearErrors() - Clear stored errors');
console.log('- debugPortfolio.showStoredErrors() - Show errors in table format');
console.log('- debugPortfolio.testError() - Trigger a test error');
console.log('- debugPortfolio.checkResources() - Check if all resources load correctly');

export {};