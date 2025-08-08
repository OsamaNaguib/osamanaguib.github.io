import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './debug.ts';

// Error boundary component
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
    
    // Show static fallback
    const staticFallback = document.getElementById('static-fallback');
    if (staticFallback) {
      staticFallback.style.display = 'block';
      // Load the static JavaScript
      const script = document.createElement('script');
      script.src = './script.js';
      document.head.appendChild(script);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
          <h1>Something went wrong with the React app.</h1>
          <p>The static version is loading...</p>
        </div>
      );
    }

    return this.props.children;
  }
}

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
  
  console.log('✅ React app loaded successfully');
} catch (error) {
  console.error('❌ Failed to load React app:', error);
  
  // Show static fallback
  const staticFallback = document.getElementById('static-fallback');
  if (staticFallback) {
    staticFallback.style.display = 'block';
    // Load the static JavaScript
    const script = document.createElement('script');
    script.src = './script.js';
    document.head.appendChild(script);
  }
}
