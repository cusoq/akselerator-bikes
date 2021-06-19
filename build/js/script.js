'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var pageElement = document.querySelector('body');
var popupOverlayElement = document.querySelector('.navigation');
var menuBlockElement = document.querySelector('.navigation__list');
var crossButtonElement = popupOverlayElement.querySelector('.navigation__menu-close-cross-button');
var navLinkElements = popupOverlayElement.querySelectorAll('.navigation__link');
var burgerButtonElement = document.querySelector('.intro__menu-open-burger-button');
var anchorsElements = document.querySelectorAll('a[href*="#"]');

var showBurger = function () {
  if (burgerButtonElement) {
    burgerButtonElement.classList.remove('visually-hidden');
  }
};

showBurger();

// открытие модального окна
var showPopup = function () {
  if (popupOverlayElement || crossButtonElement || burgerButtonElement) {
    popupOverlayElement.classList.remove('navigation--closed');
    crossButtonElement.classList.remove('navigation__menu-close-cross-button--closed');
    burgerButtonElement.classList.add('intro__menu-open-burger-button--closed');
    pageElement.classList.add('non-scroll');
  }
};

// закрытие модального окна
var closePopup = function () {
  if (popupOverlayElement || crossButtonElement || burgerButtonElement) {
    popupOverlayElement.classList.add('navigation--closed');
    crossButtonElement.classList.add('navigation__menu-close-cross-button--closed');
    burgerButtonElement.classList.remove('intro__menu-open-burger-button--closed');
    pageElement.classList.remove('non-scroll');
  }
};

// Плавная прокрутка для якорных ссылок
var smoothOperate = function () {
  anchorsElements.forEach(function (anchor) {
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
  if (evt.target !== menuBlockElement) {
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
burgerButtonElement.addEventListener('click', onClickOpener);
burgerButtonElement.addEventListener('keydown', onEnterOpener);
crossButtonElement.addEventListener('click', onClickCloser);
popupOverlayElement.addEventListener('click', onClickCloser);
navLinkElements.forEach(function (element) {
  element.addEventListener('click', onClickCloser);
});
document.addEventListener('keydown', onEscCloser);
