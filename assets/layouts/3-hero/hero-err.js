/**
 * @jest-environment jsdom
 */

import { fireEvent } from '@testing-library/dom';

describe('Hero Slider Functionality', () => {
  let heroSliderItems, prevBtn, nextBtn, autoSlideInterval;

  beforeEach(() => {
    // Mock the DOM
    document.body.innerHTML = `
      <div class="slider-item active"></div>
      <div class="slider-item"></div>
      <div class="slider-item"></div>
      <button class="prev"></button>
      <button class="next"></button>
    `;

    heroSliderItems = document.querySelectorAll('.slider-item');
    prevBtn = document.querySelector('.prev');
    nextBtn = document.querySelector('.next');

    // Mock the script's behavior
    let currentSlidePos = 0;
    let lastActiveSliderItem = heroSliderItems[0];

    const updateSliderPos = () => {
      lastActiveSliderItem.classList.remove('active');
      heroSliderItems[currentSlidePos].classList.add('active');
      lastActiveSliderItem = heroSliderItems[currentSlidePos];
    };

    const slideNext = () => {
      if (currentSlidePos >= heroSliderItems.length - 1) {
        currentSlidePos = 0;
      } else {
        currentSlidePos++;
      }
      updateSliderPos();
    };

    const slidePrev = () => {
      if (currentSlidePos <= 0) {
        currentSlidePos = heroSliderItems.length - 1;
      } else {
        currentSlidePos--;
      }
      updateSliderPos();
    };

    nextBtn.addEventListener('click', slideNext);
    prevBtn.addEventListener('click', slidePrev);

    autoSlideInterval = setInterval(slideNext, 7000);

    [prevBtn, nextBtn].forEach((btn) => {
      btn.addEventListener('mouseover', () => clearInterval(autoSlideInterval));
      btn.addEventListener('mouseout', () => {
        autoSlideInterval = setInterval(slideNext, 7000);
      });
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('initial state: first slider item is active', () => {
    expect(heroSliderItems[0].classList.contains('active')).toBe(true);
    expect(heroSliderItems[1].classList.contains('active')).toBe(false);
    expect(heroSliderItems[2].classList.contains('active')).toBe(false);
  });

  test('clicking "next" button updates the active slide', () => {
    fireEvent.click(nextBtn);

    expect(heroSliderItems[0].classList.contains('active')).toBe(false);
    expect(heroSliderItems[1].classList.contains('active')).toBe(true);

    fireEvent.click(nextBtn);

    expect(heroSliderItems[1].classList.contains('active')).toBe(false);
    expect(heroSliderItems[2].classList.contains('active')).toBe(true);
  });

  test('clicking "previous" button updates the active slide', () => {
    fireEvent.click(prevBtn);

    expect(heroSliderItems[0].classList.contains('active')).toBe(false);
    expect(heroSliderItems[2].classList.contains('active')).toBe(true);

    fireEvent.click(prevBtn);

    expect(heroSliderItems[2].classList.contains('active')).toBe(false);
    expect(heroSliderItems[1].classList.contains('active')).toBe(true);
  });

  test('wraparound behavior for "next" and "previous" buttons', () => {
    fireEvent.click(prevBtn);

    expect(heroSliderItems[0].classList.contains('active')).toBe(false);
    expect(heroSliderItems[2].classList.contains('active')).toBe(true);

    fireEvent.click(nextBtn);

    expect(heroSliderItems[2].classList.contains('active')).toBe(false);
    expect(heroSliderItems[0].classList.contains('active')).toBe(true);
  });

  test('slider auto-updates after interval', () => {
    jest.useFakeTimers();
    jest.advanceTimersByTime(7000);

    expect(heroSliderItems[0].classList.contains('active')).toBe(false);
    expect(heroSliderItems[1].classList.contains('active')).toBe(true);

    jest.advanceTimersByTime(7000);

    expect(heroSliderItems[1].classList.contains('active')).toBe(false);
    expect(heroSliderItems[2].classList.contains('active')).toBe(true);
  });

  test('hovering over navigation buttons pauses auto slide', () => {
    jest.useFakeTimers();

    fireEvent.mouseOver(nextBtn);
    jest.advanceTimersByTime(7000);

    // Auto slide should not update during hover
    expect(heroSliderItems[0].classList.contains('active')).toBe(true);

    fireEvent.mouseOut(nextBtn);
    jest.advanceTimersByTime(7000);

    // Auto slide should resume
    expect(heroSliderItems[0].classList.contains('active')).toBe(false);
    expect(heroSliderItems[1].classList.contains('active')).toBe(true);
  });
});
