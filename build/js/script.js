'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var popupOverlay = document.querySelector('.navigation');
var popup = document.querySelector('.navigation__list');
// console.log(popup);
var crossButton = popupOverlay.querySelector('.navigation__menu-close-cross-button');
var navLink = popupOverlay.querySelectorAll('.navigation__link');
var burgerButton = document.querySelector('.intro__menu-open-burger-button');

var showBurger = function () {
  if (burgerButton) {
    burgerButton.classList.remove('visually-hidden');
  }
};

showBurger();

// открытие модального окна
var showPopup = function () {
  if (popupOverlay || crossButton || burgerButton) {
    popupOverlay.classList.remove('navigation--closed');
    crossButton.classList.remove('navigation__menu-close-cross-button--closed');
    burgerButton.classList.add('intro__menu-open-burger-button--closed');
  }
};

// закрытие модального окна
var closePopup = function () {
  if (popupOverlay || crossButton || burgerButton) {
    popupOverlay.classList.add('navigation--closed');
    crossButton.classList.add('navigation__menu-close-cross-button--closed');
    burgerButton.classList.remove('intro__menu-open-burger-button--closed');
  }
};

// Хендлеры
var onClickOpener = function (evt) {
  evt.preventDefault();
  showPopup();
};

var onClickCloser = function (evt) {
  evt.preventDefault();
  if (evt.target !== popup) {
    closePopup();
  }
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
popupOverlay.addEventListener('click', onClickCloser);
navLink.forEach(function (element) {
  element.addEventListener('click', onClickCloser);
});
document.addEventListener('keydown', onEscCloser);
