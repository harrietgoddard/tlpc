// Mobile menu functionality
class MobileMenu {
  constructor() {
    this.menuBtn = document.querySelector('.header__mobile-menu-btn');
    this.drawer = document.querySelector('.mobile-drawer');
    this.overlay = document.querySelector('.mobile-overlay');
    this.closeBtn = document.querySelector('.mobile-drawer__close');
    
    this.init();
  }
  
  init() {
    if (!this.menuBtn || !this.drawer || !this.overlay || !this.closeBtn) {
      return;
    }
    
    // Bind event listeners
    this.menuBtn.addEventListener('click', () => this.openMenu());
    this.closeBtn.addEventListener('click', () => this.closeMenu());
    this.overlay.addEventListener('click', () => this.closeMenu());
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen()) {
        this.closeMenu();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isMenuOpen()) {
        this.closeMenu();
      }
    });
  }
  
  openMenu() {
    this.drawer.classList.add('open');
    this.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    this.closeBtn.focus();
  }
  
  closeMenu() {
    this.drawer.classList.remove('open');
    this.overlay.classList.remove('open');
    document.body.style.overflow = '';
    
    // Return focus to menu button
    this.menuBtn.focus();
  }
  
  isMenuOpen() {
    return this.drawer.classList.contains('open');
  }
}

// Navigation active state management
class Navigation {
  constructor() {
    this.currentPage = this.getCurrentPage();
    this.init();
  }
  
  init() {
    this.setActiveNavItems();
  }
  
  getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    
    // Remove .html extension for comparison
    return filename.replace('.html', '') || 'index';
  }
  
  setActiveNavItems() {
    // Desktop navigation
    const desktopLinks = document.querySelectorAll('.header__nav-link');
    desktopLinks.forEach(link => {
      const href = link.getAttribute('href');
      const linkPage = href.replace('.html', '').replace('./', '') || 'index';
      
      if (linkPage === this.currentPage) {
        link.classList.add('active');
      }
    });
    
    // Mobile navigation
    const mobileLinks = document.querySelectorAll('.mobile-drawer__nav-link');
    mobileLinks.forEach(link => {
      const href = link.getAttribute('href');
      const linkPage = href.replace('.html', '').replace('./', '') || 'index';
      
      if (linkPage === this.currentPage) {
        link.classList.add('active');
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MobileMenu();
  new Navigation();
});