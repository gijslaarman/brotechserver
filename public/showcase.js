"use strict";

function createNavigationArrows(element) {
  element.insertAdjacentHTML('afterbegin', "<a data-label=\"previous\" class=\"nav previous\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><path d=\"M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zM118.059 272.971l135.515 135.515c9.373 9.373 24.569 9.373 33.941 0l16.971-16.971c9.373-9.373 9.373-24.569 0-33.941L202.912 256l101.574-101.573c9.373-9.373 9.373-24.569 0-33.941l-16.971-16.971c-9.373-9.373-24.569-9.373-33.941 0L118.059 239.029c-9.373 9.373-9.373 24.569 0 33.942z\"/></svg></a>");
  element.insertAdjacentHTML('beforeend', "<a data-label=\"next\" class=\"nav next\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><path d=\"M48 32h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48zm281.941 207.029L194.427 103.515c-9.373-9.373-24.569-9.373-33.941 0l-16.971 16.971c-9.373 9.373-9.373 24.569 0 33.941L245.088 256 143.515 357.573c-9.373 9.373-9.373 24.569 0 33.941l16.971 16.971c9.373 9.373 24.569 9.373 33.941 0L329.942 272.97c9.372-9.372 9.372-24.568-.001-33.941z\"/></svg></a>");
}

function handleChange(direction) {
  var currentImage = window.location.hash.split('-').pop();
  var amountOfImages = document.querySelectorAll('.wrapper figure').length;
  var nextImage;

  switch (direction) {
    case 'next':
      nextImage = Number(currentImage) + 1;
      break;

    case 'previous':
      nextImage = Number(currentImage) - 1;
  }

  if (nextImage > amountOfImages - 1) {
    // Go back to first image
    nextImage = 0;
  } else if (nextImage < 0) {
    // Go back to last image
    nextImage = amountOfImages - 1;
  }

  window.location.hash = "img-".concat(nextImage);
}

function handleNavigationButtons(e) {
  var direction = this.getAttribute('data-label');
  handleChange(direction);
}

(function () {
  var carousel = document.querySelector('.showcase');
  createNavigationArrows(carousel);
  var arrowButtons = document.querySelectorAll('a.nav');
  arrowButtons.forEach(function (button) {
    return button.addEventListener('click', handleNavigationButtons);
  });
})();

window.addEventListener("keyup", function (e) {
  var leftKey = '37';
  var rightKey = '39';

  if (e.keyCode == leftKey) {
    handleChange('previous');
  } else if (e.keyCode == rightKey) {
    handleChange('next');
  }
});