/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.addEventListener('DOMContentLoaded', () => {
  // << Tabs
  const tabheaderItems = document.querySelectorAll('.tabheader__item');
  const tabContents = document.querySelectorAll('.tabcontent');
  tabheaderItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      tabContents.forEach(element => {
        element.classList.remove('tabcontent__visible');
      });
      tabheaderItems.forEach(item => {
        item.classList.remove('tabheader__item_active');
      });
      tabContents[i].classList.add('tabcontent__visible');
      item.classList.add('tabheader__item_active');
    });
  });
  // >>

  // << Timer
  const deadline = '2025-01-06';
  const timerObj = document.querySelector('.timer');
  const setTimerIntervalId = setInterval(setTimer, 1000, deadline, timerObj);
  function setTimer(endtime, obj) {
    const timeDiff = Date.parse(endtime) - new Date();
    if (timeDiff <= 0) {
      clearInterval(setTimerIntervalId);
      return;
    }
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
      hours = Math.floor(timeDiff / (1000 * 60 * 60) % 24),
      minutes = Math.floor(timeDiff / (1000 * 60) % 60),
      seconds = Math.floor(timeDiff / 1000 % 60);
    function formatLable(digit) {
      if (String(digit).length == 1) {
        return `0${digit}`;
      } else {
        return digit;
      }
    }
    obj.querySelector('#days').textContent = formatLable(days);
    obj.querySelector('#hours').textContent = formatLable(hours);
    obj.querySelector('#minutes').textContent = formatLable(minutes);
    obj.querySelector('#seconds').textContent = formatLable(seconds);
  }
  // >>

  // << Modal
  const openModalTimeout = 30000;
  const openModalBtns = document.querySelectorAll('[data-modal_open]');
  const modalWindow = document.querySelector('.modal');

  // const modalTimeout = setTimeout(openModalWindow, openModalTimeout);

  function openModalWindow() {
    modalWindow.style.display = 'block';
    document.removeEventListener('scroll', scrollListner);
    // clearTimeout(modalTimeout);
  }

  function closeModalWindow() {
    modalWindow.style.display = 'none';
  }
  openModalBtns.forEach(item => {
    item.addEventListener('click', () => {
      openModalWindow();
    });
  });
  modalWindow.addEventListener('click', e => {
    if (e.target.getAttribute('data-close') == '') {
      closeModalWindow();
    }
  });
  document.addEventListener('keydown', event => {
    if (event.code == 'Escape') {
      closeModalWindow();
    }
  });
  const scrollListner = () => {
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    if (clientHeight + scrollTop == scrollHeight) {
      openModalWindow();
    }
  };

  // document.addEventListener('scroll', scrollListner);
  // >>

  // << Menu
  class MenuItem {
    constructor(item) {
      this.img = item.img;
      this.title = item.title;
      this.descr = item.descr;
      this.price = item.price;
      this.parent = document.querySelector(item.parentSelector);
      this.html = this.constructHTML();
    }
    constructHTML() {
      return `<div class="menu__item">
                <img src="img/tabs/${this.img}.jpg" alt="${this.img}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
              </div>`;
    }
    render() {
      if (this.parent) {
        this.parent.innerHTML += this.html;
      }
    }
  }
  const menuSelector = '.menu__field .container';
  new MenuItem({
    img: 'vegy',
    title: 'Меню "Фитнес"',
    descr: `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и
            фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким
            качеством!`,
    price: 229,
    parentSelector: menuSelector
  }).render();
  new MenuItem({
    img: 'elite',
    title: 'Меню “Премиум”',
    descr: `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и
            качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
    price: 550,
    parentSelector: menuSelector
  }).render();
  new MenuItem({
    img: 'post',
    title: 'Меню "Постное"',
    descr: `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов
            животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет
            тофу и импортных вегетарианских стейков.`,
    price: 430,
    parentSelector: menuSelector
  }).render();
  // >>

  // << Forms
  const forms = document.querySelectorAll('form');
  const messages = {
    loading: 'Загрузка',
    success: 'Спасибо! Мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };
  forms.forEach(item => {
    postData(item);
  });
  function postData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');
      request.setRequestHeader('Content-type', 'application/json');
      const formData = new FormData(form);
      let object = {};
      formData.forEach(function (key, value) {
        object[key] = value;
      });
      const json = JSON.stringify(object);
      request.send(json);
      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          showThanksModal(messages.success);
          form.reset();
        } else {
          console.log(`error: ${request.status}`);
          showThanksModal(messages.failure);
        }
      });
    });
  }
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModalWindow();
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
    }, 4000);
    prevModalDialog.classList.add('show');
    prevModalDialog.classList.remove('hide');
    closeModalWindow();
  }
  // >>;
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map