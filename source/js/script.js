'use strict';
// var pageHeader = document.querySelector('.page-header');
// var headerToggle = document.querySelector('.page-header__toggle');

// pageHeader.classList.remove('page-header--nojs');

// headerToggle.addEventListener('click', function () {
//   if (pageHeader.classList.contains('page-header--closed')) {
//     pageHeader.classList.remove('page-header--closed');
//     pageHeader.classList.add('page-header--opened');
//   } else {
//     pageHeader.classList.add('page-header--closed');
//     pageHeader.classList.remove('page-header--opened');
//   }
// });

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var popupOverlay = document.querySelector('.navigation');
// console.log(popupOverlay);
var crossButton = popupOverlay.querySelector('.navigation__menu-close-cross-button');
var navLink = popupOverlay.querySelectorAll('.navigation__link');
// console.log(crossButton);
var burgerButton = document.querySelector('.intro__menu-open-burger-button');
// console.log(burgerButton);

// открытие модального окна
var showPopup = function () {
  popupOverlay.classList.remove('navigation--closed');
  crossButton.classList.remove('navigation__menu-close-cross-button--closed');
  burgerButton.classList.add('intro__menu-open-burger-button--closed');
  // checkStorageSupport();
  // getFocus();
};
// закрытие модального окна
var closePopup = function () {
  popupOverlay.classList.add('navigation--closed');
  crossButton.classList.add('navigation__menu-close-cross-button--closed');
  burgerButton.classList.remove('intro__menu-open-burger-button--closed');
};

// Хендлеры
var onClickOpener = function (evt) {
  evt.preventDefault();
  showPopup();
};

var onClickCloser = function (evt) {
  evt.preventDefault();
  closePopup();
};

var onEnterOpener = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    showPopup();
  }
};

var onEscCloser = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.preventDefault();
    window.removeEventListener('keydown', onEscCloser);
    closePopup();
  }
};

// Обработчики событий
burgerButton.addEventListener('click', onClickOpener);
crossButton.addEventListener('keydown', onEnterOpener);
crossButton.addEventListener('click', onClickCloser);
navLink.forEach(function (element) {
  element.addEventListener('click', onClickCloser);
});
document.addEventListener('keydown', onEscCloser);
