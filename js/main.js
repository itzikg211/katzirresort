/**
 * Katzir Resort - Landing Page JavaScript
 * Handles: navigation, animations, gallery, WhatsApp button
 */

document.addEventListener('DOMContentLoaded', function () {

  // ========== NAVIGATION SCROLL EFFECT ==========
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('hero');

  function handleNavScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Initial check

  // ========== MOBILE MENU ==========
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  function toggleMenu() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  function closeMenu() {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', toggleMenu);

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        var offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // ========== ACTIVE NAV LINK HIGHLIGHTING ==========
  var sections = document.querySelectorAll('section[id]');
  var navLinksAll = document.querySelectorAll('.nav-links a');

  var observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinksAll.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // ========== AOS INITIALIZATION ==========
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      mirror: false
    });
  }

  // ========== GLIGHTBOX GALLERY ==========
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      closeOnOutsideClick: true,
      cssEfects: { fade: { in: 'fadeIn', out: 'fadeOut' } }
    });
  }

  // ========== FLOATING WHATSAPP BUTTON ==========
  var whatsappFloat = document.getElementById('whatsappFloat');

  if (heroSection && whatsappFloat) {
    var whatsappObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          whatsappFloat.classList.remove('visible');
        } else {
          whatsappFloat.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    whatsappObserver.observe(heroSection);
  }

  // ========== PRELOAD HERO IMAGE ==========
  var heroImg = new Image();
  heroImg.src = 'https://a0.muscache.com/im/pictures/miso/Hosting-1197957079344916295/original/2e6f6445-4e8a-4d36-b6b4-290f094e3d17.jpeg';

});
