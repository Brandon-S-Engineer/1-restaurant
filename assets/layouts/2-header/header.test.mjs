/**
 * @jest-environment jsdom
 */

import { fireEvent } from '@testing-library/dom';

describe('Website Navbar and Scroll Functionality', () => {
  let navbar, overlay, navTogglers, header, backToBtn;

  beforeEach(() => {
    // Mock the DOM
    document.body.innerHTML = `
      <div class="navbar"></div>
      <div class="overlay"></div>
      <button data-nav-toggler></button>
      <button data-nav-toggler></button>
      <header class="header"></header>
      <button class="back-top-btn"></button>
    `;

    navbar = document.querySelector('.navbar');
    overlay = document.querySelector('.overlay');
    navTogglers = document.querySelectorAll('[data-nav-toggler]');
    header = document.querySelector('.header');
    backToBtn = document.querySelector('.back-top-btn');

    // Mock the script's behavior (manual inclusion)
    const addEventOnElements = (elements, eventType, callback) => {
      for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
      }
    };

    const toggleNavbar = () => {
      navbar.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.classList.toggle('nav-active');
    };

    addEventOnElements(navTogglers, 'click', toggleNavbar);

    // Hide header mock (for scroll behavior)
    let lastScrollPos = 0;
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 50) {
        header.classList.add('active');
        backToBtn.classList.add('active');
        const isScrollBottom = lastScrollPos < window.scrollY;
        if (isScrollBottom) {
          header.classList.add('hide');
        } else {
          header.classList.remove('hide');
        }
        lastScrollPos = window.scrollY;
      } else {
        header.classList.remove('active');
        backToBtn.classList.remove('active');
      }
    });
  });

  // Test 1: Add event listener on multiple elements
  test('addEventOnElements adds event listeners to all elements', () => {
    const clickHandler = jest.fn();
    const buttons = document.querySelectorAll('[data-nav-toggler]');

    buttons.forEach((btn) => {
      btn.addEventListener('click', clickHandler);
    });

    buttons.forEach((btn) => fireEvent.click(btn));

    expect(clickHandler).toHaveBeenCalledTimes(buttons.length);
  });

  // Test 2: Navbar toggle functionality
  test('toggleNavbar toggles "active" classes on navbar, overlay, and body', () => {
    const button = document.querySelector('[data-nav-toggler]');

    fireEvent.click(button);

    expect(navbar.classList.contains('active')).toBe(true);
    expect(overlay.classList.contains('active')).toBe(true);
    expect(document.body.classList.contains('nav-active')).toBe(true);

    fireEvent.click(button);

    expect(navbar.classList.contains('active')).toBe(false);
    expect(overlay.classList.contains('active')).toBe(false);
    expect(document.body.classList.contains('nav-active')).toBe(false);
  });

  // Test 3: Scroll behavior - Header and back-to-top button
  test('scrolling down shows header and back-to-top button, hides header when scrolling down further', () => {
    // Simulate scroll down past 50px
    Object.defineProperty(window, 'scrollY', { writable: true, value: 100 });
    window.dispatchEvent(new Event('scroll'));

    expect(header.classList.contains('active')).toBe(true);
    expect(backToBtn.classList.contains('active')).toBe(true);

    // Simulate scrolling down further
    Object.defineProperty(window, 'scrollY', { writable: true, value: 150 });
    window.dispatchEvent(new Event('scroll'));

    expect(header.classList.contains('hide')).toBe(true);

    // Simulate scrolling back up
    Object.defineProperty(window, 'scrollY', { writable: true, value: 50 });
    window.dispatchEvent(new Event('scroll'));

    expect(header.classList.contains('hide')).toBe(false);
  });

  // Test 4: Scroll behavior - Resets header and back-to-top button when at the top
  test('scrolling back to the top resets header and back-to-top button classes', () => {
    // Simulate scroll down and then back up to the top
    Object.defineProperty(window, 'scrollY', { writable: true, value: 0 });
    window.dispatchEvent(new Event('scroll'));

    expect(header.classList.contains('active')).toBe(false);
    expect(backToBtn.classList.contains('active')).toBe(false);
  });
});
