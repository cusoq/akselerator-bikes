'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var popupOverlay = document.querySelector('.navigation');
var popup = document.querySelector('.navigation__list');
var crossButton = popupOverlay.querySelector('.navigation__menu-close-cross-button');
var navLink = popupOverlay.querySelectorAll('.navigation__link');
var burgerButton = document.querySelector('.intro__menu-open-burger-button');
var anchors = document.querySelectorAll('a[href*="#"]');

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

// Плавная прокрутка для якорных ссылок
var smoothOperate = function () {
  anchors.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var blockID = anchor.getAttribute('href').substr(1);
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
};

smoothOperate();

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
burgerButton.addEventListener('keydown', onEnterOpener);
crossButton.addEventListener('click', onClickCloser);
popupOverlay.addEventListener('click', onClickCloser);
navLink.forEach(function (element) {
  element.addEventListener('click', onClickCloser);
});
document.addEventListener('keydown', onEscCloser);
