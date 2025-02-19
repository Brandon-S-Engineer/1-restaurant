/* -------------------------------------------------------------------------- */
/*                                 Hero Slider                                */
/* -------------------------------------------------------------------------- */
const heroSliderItems = document.querySelectorAll('.slider-item');
const heroSliderPrevBtn = document.querySelector('.prev');
const heroSliderNextBtn = document.querySelector('.next');

let currentSlidePos = 0;

let lastActiveSliderItem = null;

const updateSliderPos = function () {
  if (lastActiveSliderItem) {
    lastActiveSliderItem.classList.remove('active');
  }
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
