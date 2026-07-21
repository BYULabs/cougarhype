import './Header.css';

export function renderHeader() {
  return `
    <header class="fan-header">
      <div class="header-inner">
        <!-- Brand -->
        <div class="brand-block">
          <img src="https://ssl.gstatic.com/onebox/media/sports/logos/optimized/hxz7taoji58jiIwg5XOu9A_120x120.png" alt="BYU Logo" id="byu-logo">
          <div class="brand-text">
            <h1>CougarStats</h1>
            <p class="tagline">The 2026 Fan Hub</p>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
          <a href="#" class="active">Home Hub</a>
          <a href="#schedule">Schedule</a>
          <a href="#roster">Roster</a>
          <a href="#rivalry">Rivalries</a>
        </nav>

        <!-- Right Action Controls -->
        <div class="header-actions">
          <!-- Compact Theme Toggle -->
          <button id="theme-toggle" class="icon-btn" aria-label="Toggle Night Mode">🌙</button>

          <!-- Mobile Menu Hamburger -->
          <button id="mobile-menu-btn" class="icon-btn hamburger-btn" aria-label="Open Navigation Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Drawer -->
      <nav class="mobile-nav-drawer" id="mobile-drawer">
        <a href="#" class="active">Home Hub</a>
        <a href="#schedule">Full Schedule</a>
        <a href="#roster">Roster Analytics</a>
        <a href="#rivalry">Rivalry Grid</a>
      </nav>

      <!-- Live Context Ticker -->
      <div class="rankings-banner">
        <div class="marquee-scroller">
          <span class="lead">🔥 Big 12 Live:</span>
          <span>#1 Utah (0-0)</span> •
          <span>#2 Kansas State (0-0)</span> •
          <span class="highlight">#7 BYU Cougars (0-0)</span> •
          <span>#8 Arizona (0-0)</span> •
          <span>#9 Iowa State (0-0)</span> •
          <span class="lead">🔥 Big 12 Live:</span>
          <span>#1 Utah (0-0)</span> •
          <span>#2 Kansas State (0-0)</span> •
          <span class="highlight">#7 BYU Cougars (0-0)</span> •
          <span>#8 Arizona (0-0)</span> •
          <span>#9 Iowa State (0-0)</span>
        </div>
      </div>
    </header>
  `;
}

export function initHeaderListeners() {
  // 1. Dark Mode Toggle
  const themeBtn = document.getElementById('theme-toggle');
  let darkMode = false;

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      darkMode = !darkMode;
      document.body.classList.toggle('dark', darkMode);
      themeBtn.textContent = darkMode ? '☀️' : '🌙';
    });
  }

  // 2. Mobile Menu Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });

    // Close menu when a link is tapped
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
      });
    });
  }
}