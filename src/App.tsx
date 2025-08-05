import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar Navigation */}
      <nav className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg z-50">
        <div className="p-6">
          <div className="text-center mb-6">
            <img src="/Best.jpeg" alt="Osama M. Naguib" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Osama M. Naguib</h1>
            <p className="text-gray-600 dark:text-gray-300">Strategy & BI Consultant</p>
          </div>
          
          <button 
            onClick={toggleTheme}
            className="w-full mb-6 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Toggle Theme
          </button>
          
          <ul className="space-y-2">
            <li><a href="#about" className="block p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">About Me</a></li>
            <li><a href="#services" className="block p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Services</a></li>
            <li><a href="#contact" className="block p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Contact</a></li>
          </ul>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="ml-80 p-8">
        <section id="about" className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Driving Business Transformation Through Data-Driven Strategy
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            With over 2 decades of cross-sector leadership experience, I specialize in architecting and implementing vision-led strategies that deliver tangible, quantifiable results.
          </p>
        </section>
        
        <section id="services" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Strategic Planning</h3>
              <p className="text-gray-600 dark:text-gray-300">Market expansion, GTM strategy, and feasibility analysis.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Business Intelligence</h3>
              <p className="text-gray-600 dark:text-gray-300">Building BI functions, predictive modeling, and data visualization.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Commercial Growth</h3>
              <p className="text-gray-600 dark:text-gray-300">Pricing strategy, sales force effectiveness, and product launches.</p>
            </div>
          </div>
        </section>
        
        <section id="contact">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact</h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              I am always open to discussing new challenges, projects, and opportunities.
            </p>
            <a href="mailto:osama_naguib@hotmail.com" className="text-blue-600 hover:text-blue-800">
              osama_naguib@hotmail.com
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
