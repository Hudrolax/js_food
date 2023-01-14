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

/***/ "./src/js/modules/calculator.js":
/*!**************************************!*\
  !*** ./src/js/modules/calculator.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calculator() {
  const activityLevel = {
    low: 1.2,
    small: 1.375,
    medium: 1.55,
    high: 1.725
  };
  const calculator = {
    male: false,
    weight: 0,
    height: 0,
    age: 0,
    activity: activityLevel.small,
    calculate() {
      if (!this.weight || !this.height || !this.age) {
        return 0;
      }
      let bmr = 0;
      if (this.male) {
        bmr = 88.36 + 13.4 * this.weight + 4.8 * this.height + 5.7 * this.age;
      } else {
        bmr = 447.6 + 9.2 * this.weight + 3.1 * this.height + 4.3 * this.age;
      }
      return Math.round(bmr * this.activity);
    },
    setResult() {
      document.querySelector(".calculating__result>span").textContent = this.calculate();
    },
    setConstitution(label, val) {
      this[label] = val;
    }
  };
  function setActivityAndCalc(elements, element, param, val) {
    elements.forEach(item => item.classList.remove("calculating__choose-item_active"));
    element.classList.add("calculating__choose-item_active");
    calculator[param] = val;
    calculator.setResult();
  }

  // *** gender ***
  const genders = [document.querySelector("#female"), document.querySelector("#male")];
  const storageGender = localStorage.getItem("male") ? localStorage.getItem("male") : false;
  setActivityAndCalc(genders, storageGender ? genders[1] : genders[0], "male", storageGender);
  genders.forEach((item, i) => {
    item.addEventListener("click", () => {
      localStorage.setItem("male", i == 1);
      setActivityAndCalc(genders, item, "male", i == 1);
    });
  });

  // *** constitution ***
  const constitutions = [document.querySelector("#height"), document.querySelector("#weight"), document.querySelector("#age")];
  constitutions.forEach(item => {
    const storageItem = localStorage.getItem(item.id);
    item.value = storageItem ? storageItem : 0;
    calculator.setConstitution(item.id, +item.value);
    item.type = "number";
    item.addEventListener("input", e => {
      localStorage.setItem(e.target.id, e.target.value);
      calculator.setConstitution(e.target.id, +e.target.value);
      calculator.setResult();
    });
  });

  // *** activity ***
  const activity = [document.querySelector("#low"), document.querySelector("#small"), document.querySelector("#medium"), document.querySelector("#high")];
  const storageActivity = localStorage.getItem("activity");
  if (storageActivity) {
    const element = activity.filter(element => element.id == storageActivity)[0];
    setActivityAndCalc(activity, element, "activity", activityLevel[element.id]);
  }
  activity.forEach(item => {
    item.addEventListener("click", () => {
      setActivityAndCalc(activity, item, "activity", activityLevel[item.id]);
      localStorage.setItem("activity", item.id);
    });
  });
  calculator.setResult();
}
/* harmony default export */ __webpack_exports__["default"] = (calculator);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const MENU_ROUTE = "http://localhost:3000/menu";
function cards() {
  class MenuItem {
    constructor(item, parentSelector) {
      this.img = item.img;
      this.altimg = item.altimg;
      this.title = item.title;
      this.descr = item.descr;
      this.price = item.price;
      this.parent = document.querySelector(parentSelector);
      this.html = this.constructHTML();
    }
    constructHTML() {
      return `<div class="menu__item">
                <img src="${this.img}" alt="${this.altimg}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
              </div>`;
    }
    render() {
      if (this.parent) {
        this.parent.innerHTML += this.html;
      }
    }
  }
  const menuSelector = ".menu__field .container";
  const getResource = async url => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
    return await res.json();
  };

  // getResource(MENU_ROUTE)
  //   .then(res => res.forEach(item => {
  //     new MenuItem(item, menuSelector).render();
  //   }))
  //   .catch(reason => console.log(reason));

  axios.get(MENU_ROUTE).then(data => data.data.forEach(item => {
    new MenuItem(item, menuSelector).render();
  }));
}
/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");

const REQUEST_ROUTE = "http://localhost:3000/requests";
function forms() {
  const forms = document.querySelectorAll("form");
  const messages = {
    loading: "/img/form/spinner.svg",
    success: "Спасибо! Мы скоро с вами свяжемся",
    failure: "Что-то пошло не так..."
  };
  forms.forEach(item => {
    bindPostData(item);
  });
  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: data
    });
    return await res.json();
  };
  function bindPostData(form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const spinnerImg = document.createElement("img");
      spinnerImg.src = messages.loading;
      spinnerImg.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", spinnerImg);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      postData(REQUEST_ROUTE, json).then(data => {
        console.log(data);
        showThanksModal(messages.success);
      }).catch(() => {
        showThanksModal(messages.failure);
      }).finally(() => {
        form.reset();
        spinnerImg.remove();
      });
    });
  }
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.remove("show");
    prevModalDialog.classList.add("hide");
    Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModalWindow"])();
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModalWindow"])();
    }, 4000);
  }
}
/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/*! exports provided: default, closeModalWindow, openModalWindow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModalWindow", function() { return closeModalWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModalWindow", function() { return openModalWindow; });
function openModalWindow() {
  const modalWindow = document.querySelector(".modal");
  modalWindow.style.display = "block";
}
function closeModalWindow() {
  const modalWindow = document.querySelector(".modal");
  modalWindow.style.display = "none";
}
function modal() {
  const openModalTimeout = 30000;
  const openModalBtns = document.querySelectorAll("[data-modal_open]");
  const modalWindow = document.querySelector(".modal");
  const modalTimeout = setTimeout(openModalWindow, openModalTimeout);
  openModalBtns.forEach(item => {
    item.addEventListener("click", () => {
      openModalWindow();
      clearTimeout(modalTimeout);
    });
  });
  modalWindow.addEventListener("click", e => {
    if (e.target.getAttribute("data-close") == "") {
      closeModalWindow();
      document.removeEventListener("scroll", scrollListner);
    }
  });
  document.addEventListener("keydown", event => {
    if (event.code == "Escape") {
      closeModalWindow();
      document.removeEventListener("scroll", scrollListner);
    }
  });
  const scrollListner = function () {
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    if (clientHeight + scrollTop == scrollHeight) {
      openModalWindow();
      clearTimeout(modalTimeout);
    }
  };
  document.addEventListener('scroll', scrollListner);
}
/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider() {
  const slides = document.querySelectorAll(".offer__slide");
  const prev = document.querySelector(".offer__slider-prev");
  const next = document.querySelector(".offer__slider-next");
  const slidesWrapper = document.querySelector(".offer__slider-wrapper");
  const slidesField = document.querySelector(".offer__slider-inner");
  const width = window.getComputedStyle(slidesWrapper).width;
  const slider = document.querySelector(".offer__slider");
  let slideIndex = 1;
  let offset = 0;
  const currentSlides = document.querySelector("#current");
  document.querySelector("#total").textContent = textIndex(slides.length);
  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";
  slidesWrapper.style.overflow = "hidden";
  slides.forEach(slide => {
    slide.style.width = width;
  });
  slider.style.position = "relative";
  const indicators = document.createElement("ol");
  let dots = [];
  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  slider.append(indicators);
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }
  dots.forEach((item, i) => item.addEventListener("click", () => {
    setSlide(i + 1);
  }));
  next.addEventListener("click", () => setSlide(slideIndex + 1));
  prev.addEventListener("click", () => setSlide(slideIndex - 1));
  function setSlide(n) {
    slideIndex = n;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    } else if (slideIndex < 1) {
      slideIndex = slides.length;
    }
    currentSlides.textContent = textIndex();
    dots.forEach(item => item.style.opacity = ".5");
    dots[slideIndex - 1].style.opacity = 1;
    offset = +width.replace(/\D/g, "") * (slideIndex - 1);
    slidesField.style.transform = `translateX(-${offset}px)`;
  }
  function textIndex() {
    let index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : slideIndex;
    if (index < 10) {
      return `0${index}`;
    }
    return index;
  }

  // showSlides();

  // function showSlides() {
  //   if (slideIndex > slides.length) { slideIndex = 1; }
  //   if (slideIndex < 1) { slideIndex = slides.length; }

  //   slides.forEach(item => item.style.display = 'none');
  //   slides[slideIndex - 1].style.display = 'block';
  //   currentSlides.textContent = textIndex();
  // }

  // prev.addEventListener('click', () => {
  //   slideIndex--;
  //   showSlides();
  // });

  // next.addEventListener('click', () => {
  //   slideIndex++;
  //   showSlides();
  // });
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs() {
  const tabheaderItems = document.querySelectorAll(".tabheader__item");
  const tabContents = document.querySelectorAll(".tabcontent");
  tabheaderItems.forEach((item, i) => {
    item.addEventListener("click", () => {
      tabContents.forEach(element => {
        element.classList.remove("tabcontent__visible");
      });
      tabheaderItems.forEach(item => {
        item.classList.remove("tabheader__item_active");
      });
      tabContents[i].classList.add("tabcontent__visible");
      item.classList.add("tabheader__item_active");
    });
  });
}
/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer() {
  const deadline = "2025-01-06";
  const timerObj = document.querySelector(".timer");
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
    obj.querySelector("#days").textContent = formatLable(days);
    obj.querySelector("#hours").textContent = formatLable(hours);
    obj.querySelector("#minutes").textContent = formatLable(minutes);
    obj.querySelector("#seconds").textContent = formatLable(seconds);
  }
}
/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./src/js/modules/calculator.js");









window.addEventListener("DOMContentLoaded", () => {
  Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
  Object(_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])();
  Object(_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])();
  Object(_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  Object(_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])();
  Object(_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])();
  Object(_modules_calculator__WEBPACK_IMPORTED_MODULE_6__["default"])();
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map