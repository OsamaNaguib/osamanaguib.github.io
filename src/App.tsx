import React, { useEffect, useState } from 'react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }

    // Error handling
    const handleError = (error: ErrorEvent) => {
      console.error('React App Error:', error);
    };
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Sidebar Navigation */}
      <nav className={`sidebar ${sidebarOpen ? 'open' : ''}`} id="sidebar">
        <div className="sidebar-header">
          <div className="profile-section">
            <div className="profile-image-container">
              <img src="public/Best.jpeg" alt="Osama M. Naguib" className="profile-image" />
              <div className="profile-status"></div>
            </div>
            <h1 className="profile-name">Osama M. Naguib</h1>
            <p className="profile-title">Strategy & BI Consultant</p>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">22+</span>
                <span className="stat-label">Years</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">20+</span>
                <span className="stat-label">Launches</span>
              </div>
            </div>
          </div>
          
          <div className="theme-toggle">
            <button id="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
              <span className="toggle-text">Theme</span>
              <i className="fas fa-moon"></i>
            </button>
          </div>
        </div>
        
        <ul className="nav-menu">
          <li><a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}><i className="fas fa-user-tie"></i> About Me</a></li>
          <li><a href="#services" className={`nav-link ${activeSection === 'services' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}><i className="fas fa-cogs"></i> Services</a></li>
          <li><a href="#case-studies" className={`nav-link ${activeSection === 'case-studies' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('case-studies'); }}><i className="fas fa-briefcase"></i> Case Studies</a></li>
          <li><a href="#powerbi" className={`nav-link ${activeSection === 'powerbi' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('powerbi'); }}><i className="fas fa-chart-bar"></i> Power BI Showcase</a></li>
          <li><a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}><i className="fas fa-envelope-open-text"></i> Contact</a></li>
        </ul>
        
        <div className="sidebar-footer">
          <div className="social-links">
            <a href="https://www.linkedin.com/in/osama-naguib/" target="_blank" aria-label="LinkedIn Profile">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/OsamaNaguib" target="_blank" aria-label="GitHub Profile">
              <i className="fab fa-github"></i>
            </a>
            <a href="mailto:osama_naguib@hotmail.com" aria-label="Send Email">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-toggle" 
        id="mobile-menu-toggle" 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle navigation menu"
      >
        <i className="fas fa-bars"></i>
      </button>
      
      {/* Main Content */}
      <main className="main-content">
        {/* About Section */}
        <section id="about" className="section fade-in">
          <div className="container">
            <h1 className="section-title">Driving Business Transformation Through Data-Driven Strategy</h1>
            
            <div className="about-content">
              <p className="lead">With over 2 decades of cross-sector leadership experience, I specialize in architecting and implementing vision-led strategies that deliver tangible, quantifiable results. My expertise lies at the intersection of strategic marketing, business intelligence, and commercial growth, enabling organizations to navigate complex market dynamics and achieve sustainable success.</p>
              
              <p>My career journey spans pharmaceuticals, publishing, education, and retail, providing me with a unique perspective on diverse business challenges. Backed by an international MBA and multiple Data Science Nanodegrees, I bring a rigorous, analytical approach to every project.</p>
              
              <p>I have a proven track record of building high-performing Business Intelligence functions from the ground up, leading over 20 successful product launches, and steering companies through critical transformations. Whether you are a multinational corporation, a large regional group, or an innovative startup, I partner with you to unlock your organization's full potential.</p>
              
              <p>I balance long-term strategic foresight with agile, short-term execution, bringing a strong entrepreneurial mindset to help you build strong brands, optimize operations, and accelerate growth.</p>
            </div>
            
            <div className="skills-grid">
              <div className="skill-card fade-in">
                <div className="skill-icon">
                  <i className="fas fa-chess-king"></i>
                </div>
                <h3>Strategic Planning</h3>
                <p>Market expansion, GTM strategy, and feasibility analysis.</p>
              </div>
              
              <div className="skill-card fade-in">
                <div className="skill-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3>Business Intelligence</h3>
                <p>Building BI functions, predictive modeling, and data visualization.</p>
              </div>
              
              <div className="skill-card fade-in">
                <div className="skill-icon">
                  <i className="fas fa-rocket"></i>
                </div>
                <h3>Commercial Growth</h3>
                <p>Pricing strategy, sales force effectiveness, and product launches.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section id="services" className="section fade-in">
          <div className="container">
            <h2 className="section-title">Services</h2>
            <p>Services content will be loaded here...</p>
          </div>
        </section>
        
        {/* Case Studies Section */}
        <section id="case-studies" className="section fade-in">
          <div className="container">
            <h2 className="section-title">Impact Delivered: Case Studies</h2>
            <p>Case studies content will be loaded here...</p>
          </div>
        </section>
        
        {/* Power BI Section */}
        <section id="powerbi" className="section fade-in">
          <div className="container">
            <h2 className="section-title">Power BI Showcase</h2>
            <p>Power BI content will be loaded here...</p>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="section fade-in">
          <div className="container">
            <h2 className="section-title">Let's Connect</h2>
            
            <div className="contact-content">
              <p className="contact-intro">I am always open to discussing new challenges, projects, and opportunities. Whether you are looking for a strategic consultant to help drive your next phase of growth or a senior leader to join your team, I would be delighted to hear from you.</p>
              
              <div className="contact-methods">
                <a href="mailto:osama_naguib@hotmail.com" className="contact-method fade-in">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-info">
                    <h3>Email</h3>
                    <p>osama_naguib@hotmail.com</p>
                  </div>
                </a>
                
                <a href="https://www.linkedin.com/in/osama-naguib/" target="_blank" className="contact-method fade-in">
                  <div className="contact-icon">
                    <i className="fab fa-linkedin"></i>
                  </div>
                  <div className="contact-info">
                    <h3>LinkedIn</h3>
                    <p>linkedin.com/in/osama-naguib</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
