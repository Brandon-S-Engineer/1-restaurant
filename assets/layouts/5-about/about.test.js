/**
 * @jest-environment jsdom
 */

describe('Parallax Effect', () => {
  let parallaxItems;

  beforeEach(() => {
    // Set up DOM first
    document.body.innerHTML = `
  <div data-parallax-item data-parallax-speed="1.5"></div>
  <div data-parallax-item data-parallax-speed="2.0"></div>
`;

    // Select elements now that the DOM is populated
    parallaxItems = document.querySelectorAll('[data-parallax-item]');

    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
    // Load the script
    require('./about'); // Adjust the path
  });

  test('Mousemove event applies transform styles', () => {
    const event = new MouseEvent('mousemove', {
      clientX: 100,
      clientY: 200,
    });

    window.dispatchEvent(event);

    // Force a reflow to simulate style updates
    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.parallaxSpeed);
      const x = -((100 / window.innerWidth) * 10 - 5) * speed;
      const y = -((200 / window.innerHeight) * 10 - 5) * speed;

      // Check if the styles were applied
      expect(item.style.transform).toBe(`translate3d(${x}px, ${y}px, 0px)`);
    });
  });

  test('Handles varying parallax speeds correctly', () => {
    const event = new MouseEvent('mousemove', {
      clientX: 50,
      clientY: 50,
    });

    window.dispatchEvent(event);

    const item1Speed = Number(parallaxItems[0].dataset.parallaxSpeed);
    const item2Speed = Number(parallaxItems[1].dataset.parallaxSpeed);

    const item1X = -((50 / window.innerWidth) * 10 - 5) * item1Speed;
    const item1Y = -((50 / window.innerHeight) * 10 - 5) * item1Speed;

    const item2X = -((50 / window.innerWidth) * 10 - 5) * item2Speed;
    const item2Y = -((50 / window.innerHeight) * 10 - 5) * item2Speed;

    // Force a reflow to simulate style updates
    expect(parallaxItems[0].style.transform).toBe(`translate3d(${item1X}px, ${item1Y}px, 0px)`);
    expect(parallaxItems[1].style.transform).toBe(`translate3d(${item2X}px, ${item2Y}px, 0px)`);
  });
});
