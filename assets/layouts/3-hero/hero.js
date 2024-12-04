/* -------------------------------------------------------------------------- */
/*                                 Hero Slider                                */
/* -------------------------------------------------------------------------- */
const heroSliderItems = document.querySelectorAll('.slider-item');
const heroSliderPrevBtn = document.querySelector('.prev');
const heroSliderNextBtn = document.querySelector('.next');

// const heroSliderItems = document.querySelectorAll('[data-hero-slider-item]');
// const heroSliderPrevBtn = document.querySelector('[data-prev-btn]');
// const heroSliderNextBtn = document.querySelector('[data-next-btn]');

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove('active');
  heroSliderItems[currentSlidePos].classList.add('active');
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
};

heroSliderNextBtn.addEventListener('click', slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
};

heroSliderPrevBtn.addEventListener('click', slidePrev);

/* -------------------------------------------------------------------------- */
/*                                 Auto Slide                                 */
/* -------------------------------------------------------------------------- */
/* ----------------- Add event listener on multiple elements ---------------- */
const addEventOnElementss = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};
let autoSlideInterval;
const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
};

addEventOnElementss([heroSliderPrevBtn, heroSliderNextBtn], 'mouseover', function () {
  clearInterval(autoSlideInterval);
});

addEventOnElementss([heroSliderPrevBtn, heroSliderNextBtn], 'mouseout', autoSlide);

window.addEventListener('load', autoSlide);
