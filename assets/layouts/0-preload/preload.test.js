/**
 * @jest-environment jsdom
 */

describe('Preloader functionality', () => {
  beforeEach(() => {
    // Mock the DOM
    document.body.innerHTML = `
      <div class="preload"></div>
    `;
  });

  test('adds "loaded" class to the preloader element on window load', () => {
    // Import and execute the script
    require('./preload');

    const preloader = document.querySelector('.preload');

    // Simulate the load event
    window.dispatchEvent(new Event('load'));

    // Assertions
    expect(preloader.classList.contains('loaded')).toBe(true);
    expect(document.body.classList.contains('loaded')).toBe(true);
  });

  test('does not throw if the preloader element is missing', () => {
    // Remove the preloader element from the DOM
    document.body.innerHTML = '';

    // Import and execute the script
    expect(() => {
      require('./preload');
      window.dispatchEvent(new Event('load'));
    }).not.toThrow();
  });
});
