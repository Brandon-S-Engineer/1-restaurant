/* --------- Add event listener on multiple elements (HTML or Array) -------- */
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/* -------------------------------------------------------------------------- */
/*                                   Navbar                                   */
/* -------------------------------------------------------------------------- */
const navbar = document.querySelector('.navbar');
const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const overlay = document.querySelector('.overlay');

const toggleNavbar = function () {
  navbar.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('nav-active');
};

addEventOnElements(navTogglers, 'click', toggleNavbar);

/* -------------------------------------------------------------------------- */
/*                          Header & Back to top BTN                          */
/* -------------------------------------------------------------------------- */
//! Understand
const header = document.querySelector('.header');
// const backToBtn = document.querySelector('[data-back-top-btn]');
const backToBtn = document.querySelector('.back-top-btn');

let lastScrollPos = 0;

/* ------------------------------- Back to Top ------------------------------ */
// This event listener is gonna keep track of the scrolling
window.addEventListener('scroll', function () {
  if (window.scrollY >= 50) {
    header.classList.add('active'); // Show header
    backToBtn.classList.add('active'); // Show Button
    hideHeader();
  } else {
    header.classList.remove('active');
    backToBtn.classList.remove('active');
  }
});

const hideHeader = function () {
  // Check if the user is scrolling down. If true, user is scrolling down.
  const isScrollBottom = lastScrollPos < window.scrollY;

  if (isScrollBottom) {
    header.classList.add('hide');
  } else {
    header.classList.remove('hide');
  }

  lastScrollPos = window.scrollY;
};
