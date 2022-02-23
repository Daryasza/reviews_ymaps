/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/placemark.js":
/*!*****************************!*\
  !*** ./src/js/placemark.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setExistingPlacemarks": () => (/* binding */ setExistingPlacemarks),
/* harmony export */   "updatePlacemarkContent": () => (/* binding */ updatePlacemarkContent),
/* harmony export */   "createPlacemark": () => (/* binding */ createPlacemark),
/* harmony export */   "findPlacemark": () => (/* binding */ findPlacemark)
/* harmony export */ });
/* harmony import */ var _reviewStorage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reviewStorage.js */ "./src/js/reviewStorage.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template.js */ "./src/js/template.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var ymaps = window.ymaps;
function setExistingPlacemarks(cluster, handler) {
  var reviewMap = new _reviewStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"]().getReviews();
  Object.keys(reviewMap).forEach(function (key) {
    var placemark = createPlacemark(key.split(','), cluster, handler);
    updatePlacemarkContent(placemark);
  });
}
function updatePlacemarkContent(placemark) {
  if (!placemark) return;
  var reviews = new _reviewStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"]().getReviews(placemark.geometry.getCoordinates());
  if (reviews.length === 0) return;
  var reviewsHTML = (0,_template_js__WEBPACK_IMPORTED_MODULE_1__.fillTemplate)(_template_js__WEBPACK_IMPORTED_MODULE_1__.templateReviews, reviews);
  placemark.properties.set({
    balloonContentBody: reviewsHTML,
    balloonContentFooter: _template_js__WEBPACK_IMPORTED_MODULE_1__.templateForm,
    iconContent: reviews.length > 1 ? reviews.length : ''
  });
  placemark.options.set({
    preset: reviews.length > 1 ? 'islands#blueCircleIcon' : ''
  });
}
function createPlacemark(coords, cluster, handler) {
  var placemark = new ymaps.Placemark(coords);
  placemark.events.add('balloonopen', function () {
    handler(coords);
  });
  cluster.add(placemark);
  return placemark;
}
function findPlacemark(coords, cluster) {
  var _iterator = _createForOfIteratorHelper(cluster.getGeoObjects()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      if (item.geometry.getType() === 'Point' && item.geometry.getCoordinates() === coords) return item;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

/***/ }),

/***/ "./src/js/reviewStorage.js":
/*!*********************************!*\
  !*** ./src/js/reviewStorage.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReviewStorage)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ReviewStorage = /*#__PURE__*/function () {
  function ReviewStorage() {
    _classCallCheck(this, ReviewStorage);

    this.itemName = 'reviewStore';
    this.data = JSON.parse(window.localStorage.getItem(this.itemName));

    if (!this.data) {
      this.data = {};
    }
  }

  _createClass(ReviewStorage, [{
    key: "setData",
    value: function setData() {
      window.localStorage.setItem(this.itemName, JSON.stringify(this.data));
    }
  }, {
    key: "addReview",
    value: function addReview(coords, review) {
      var key = coords.toString();

      if (!this.data[key]) {
        this.data[key] = [];
      } else {
        this.data[key].push(review);
        this.setData();
      }
    }
  }, {
    key: "getReviews",
    value: function getReviews(coords) {
      if (!coords) {
        return this.data;
      } else {
        var key = coords.toString();
        return this.data[key] ? this.data[key] : [];
      }
    }
  }]);

  return ReviewStorage;
}();



/***/ }),

/***/ "./src/js/template.js":
/*!****************************!*\
  !*** ./src/js/template.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "templateReviews": () => (/* binding */ templateReviews),
/* harmony export */   "templateForm": () => (/* binding */ templateForm),
/* harmony export */   "templateClusterLayout": () => (/* binding */ templateClusterLayout),
/* harmony export */   "fillTemplate": () => (/* binding */ fillTemplate)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var templateReviews = "\n  <ul class=\"left-reviews\">\n    <li class=\"left-review\">\n      <div class=\"left-review__title\">\n        <span class=\"left-review__author\"> {{name}}</span>\n        <span class=\"left-review__place\"> {{place}}</span>\n        <span class=\"left-review__date\"> {{date}}</span>\n      </div>\n      <div class=\"left-review__text\"> {{review}}</div>\n    </li>\n  </ul>";
var templateForm = "\n  <form class=\"review\" id=\"review\">\n    <div class=\"review__heading\">\u041E\u0442\u0437\u044B\u0432:</div>\n    <div class=\"review__inputs\">\n      <input class=\"review__input input--name\" name=\"name\" type=\"text\" placeholder=\"\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0438\u043C\u044F\">\n      <input class=\"review__input input--place\" name=\"place\" type=\"text\" placeholder=\"\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043C\u0435\u0441\u0442\u043E\">\n      <input class=\"review__input input--review\" name=\"review\" type=\"textarea\" placeholder=\"\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0437\u044B\u0432\">\n    </div>\n    <button class=\"review__btn\" type=\"submit\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>\n  </form>";
var templateClusterLayout = '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>';
function fillTemplate(template, array) {
  var html = '';
  array.forEach(function (obj) {
    var buf = template;
    var matches = buf.matchAll('{{[^s}]*}}');

    var _iterator = _createForOfIteratorHelper(matches),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var match = _step.value;
        var key = match[0].substring(2, match[0].length - 2);
        buf = buf.replace(match[0], obj[key] ? obj[key] : '');
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    html += buf;
  });
  return html;
}

/***/ }),

/***/ "./src/js/util.js":
/*!************************!*\
  !*** ./src/js/util.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFormInput": () => (/* binding */ getFormInput),
/* harmony export */   "saveData": () => (/* binding */ saveData),
/* harmony export */   "inputCheck": () => (/* binding */ inputCheck),
/* harmony export */   "validateForm": () => (/* binding */ validateForm)
/* harmony export */ });
/* harmony import */ var _reviewStorage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reviewStorage.js */ "./src/js/reviewStorage.js");

function getFormInput(form) {
  var input = {
    name: form.elements.name,
    place: form.elements.place,
    review: form.elements.review
  };

  if (validateForm(input)) {
    inputCheck();
    return input;
  }
}
function saveData(coords, reviewData) {
  var review = reviewData;
  Object.keys(review).forEach(function (key) {
    review[key] = review[key].value;
  });
  review['date'] = new Date().toISOString().substring(0, 10);
  new _reviewStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"]().addReview(coords, review);
}
function inputCheck() {
  document.addEventListener('keydown', function (e) {
    if (e.target === document.querySelector('.input--name')) {
      var isDigit = false;

      if (e.key >= 0 || e.key <= 9) {
        isDigit = true;
      }

      if (isDigit === true) {
        e.preventDefault();
      }
    }
  });
}
function validateForm(input) {
  var isValid = true;

  for (var key in input) {
    if (Object.hasOwnProperty.call(input, key)) {
      var element = input[key];
      var valid = validateField(element);

      if (!valid) {
        isValid = false;
      }
    }
  }

  function validateField(field) {
    if (!field.value.trim().length) {
      field.classList.add('review__input--error');
      return false;
    } else {
      field.classList.remove('review__input--error');
      return true;
    }
  }

  return isValid;
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/main.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/main.css ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html {\n  font-family: Arial, Helvetica, sans-serif;\n  background-color: beige;\n  width: 100%;\n  height: 100%;\n}\n\nbody {\n  width: 100%;\n  height: 100%;\n}\n\nul {\n  margin: 0;\n  padding: 0;\n}\n\nul li {\n  list-style: none;\n}\n\nhr {\n  border: none; \n  background-color: #E7E7E7; \n  height: 1px; \n  margin: 0;\n}\n\n::-webkit-scrollbar {\n  width: 3px;\n\n}\n\n::-webkit-scrollbar-thumb {\n  background-color: #C4C4C4;\n}\n\n\n.hidden {\n  visibility: hidden;\n}\n\n.map {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n\n.left-reviews {\n  font-size: 16px;\n  color: #8F8F8F;\n  margin-bottom: 20px;\n  max-height: 100px;\n  overflow: auto;\n}\n\n.left-review {\n  margin-bottom: 20px;\n}\n\n.left-review:last-child {\n  margin-bottom: 0;\n}\n\n.left-review__title {\n  margin-bottom: 5px;\n}\n\n.left-review__author {\n  color: #000;\n}\n\n.review {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding-top: 10px;\n}\n\n.review__heading {\n  margin-bottom: 20px;\n  font-weight: 700;\n  font-size: 16px;\n  color: #000;\n}\n\n.review__inputs {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  margin-bottom: 10px;\n  width: 100%;\n\n}\n\n.review__input {\n  margin-bottom: 10px;\n  padding: 11px 11px;\n  display: block;\n  width: 85%;\n}\n\n.review__input:last-child {\n  margin-bottom: 0;\n}\n\n.review__input::placeholder {\n  color: #000;\n}\n\n.review__input--error {\n  border-color: red;\n}\n\n.review__btn {\n  background-color: #FF8663;\n  color: #fff;\n  border: 0px;\n  padding: 10px 16px;\n  border-radius: 3px;\n}\n.review__btn:hover {\n  background-color: #c25e42;\n}\n\n", "",{"version":3,"sources":["webpack://./src/css/main.css"],"names":[],"mappings":"AAAA;EACE,yCAAyC;EACzC,uBAAuB;EACvB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,YAAY;EACZ,yBAAyB;EACzB,WAAW;EACX,SAAS;AACX;;AAEA;EACE,UAAU;;AAEZ;;AAEA;EACE,yBAAyB;AAC3B;;;AAGA;EACE,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,cAAc;EACd,mBAAmB;EACnB,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,iBAAiB;AACnB;;AAEA;EACE,mBAAmB;EACnB,gBAAgB;EAChB,eAAe;EACf,WAAW;AACb;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,WAAW;;AAEb;;AAEA;EACE,mBAAmB;EACnB,kBAAkB;EAClB,cAAc;EACd,UAAU;AACZ;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,yBAAyB;EACzB,WAAW;EACX,WAAW;EACX,kBAAkB;EAClB,kBAAkB;AACpB;AACA;EACE,yBAAyB;AAC3B","sourcesContent":["html {\n  font-family: Arial, Helvetica, sans-serif;\n  background-color: beige;\n  width: 100%;\n  height: 100%;\n}\n\nbody {\n  width: 100%;\n  height: 100%;\n}\n\nul {\n  margin: 0;\n  padding: 0;\n}\n\nul li {\n  list-style: none;\n}\n\nhr {\n  border: none; \n  background-color: #E7E7E7; \n  height: 1px; \n  margin: 0;\n}\n\n::-webkit-scrollbar {\n  width: 3px;\n\n}\n\n::-webkit-scrollbar-thumb {\n  background-color: #C4C4C4;\n}\n\n\n.hidden {\n  visibility: hidden;\n}\n\n.map {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n\n.left-reviews {\n  font-size: 16px;\n  color: #8F8F8F;\n  margin-bottom: 20px;\n  max-height: 100px;\n  overflow: auto;\n}\n\n.left-review {\n  margin-bottom: 20px;\n}\n\n.left-review:last-child {\n  margin-bottom: 0;\n}\n\n.left-review__title {\n  margin-bottom: 5px;\n}\n\n.left-review__author {\n  color: #000;\n}\n\n.review {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding-top: 10px;\n}\n\n.review__heading {\n  margin-bottom: 20px;\n  font-weight: 700;\n  font-size: 16px;\n  color: #000;\n}\n\n.review__inputs {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  margin-bottom: 10px;\n  width: 100%;\n\n}\n\n.review__input {\n  margin-bottom: 10px;\n  padding: 11px 11px;\n  display: block;\n  width: 85%;\n}\n\n.review__input:last-child {\n  margin-bottom: 0;\n}\n\n.review__input::placeholder {\n  color: #000;\n}\n\n.review__input--error {\n  border-color: red;\n}\n\n.review__btn {\n  background-color: #FF8663;\n  color: #fff;\n  border: 0px;\n  padding: 10px 16px;\n  border-radius: 3px;\n}\n.review__btn:hover {\n  background-color: #c25e42;\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/css/main.css":
/*!**************************!*\
  !*** ./src/css/main.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/main.css */ "./src/css/main.css");
/* harmony import */ var _js_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/util.js */ "./src/js/util.js");
/* harmony import */ var _js_placemark_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/placemark.js */ "./src/js/placemark.js");
/* harmony import */ var _js_template_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/template.js */ "./src/js/template.js");




var ymaps = window.ymaps;
var map;
var cluster;

function init() {
  map = new ymaps.Map('map', {
    center: [55.76, 37.64],
    behaviors: ['dblclickzoom', 'drag'],
    zoom: 11
  });
  map.events.add('balloonopen', function (e) {
    balloonOpenHandler(e.originalEvent.currentTarget.balloon._balloon._position);
  });
  map.events.add('click', function (e) {
    var coords = e.get('coords');
    map.balloon.open(coords, {
      content: _js_template_js__WEBPACK_IMPORTED_MODULE_3__.templateForm
    });
  });
  var clusterLayout = ymaps.templateLayoutFactory.createClass(_js_template_js__WEBPACK_IMPORTED_MODULE_3__.templateClusterLayout);
  cluster = new ymaps.Clusterer({
    gridSize: 100,
    clusterDisableClickZoom: true,
    clusterOpenBalloonOnClick: true,
    clusterBalloonContentLayout: 'cluster#balloonCarousel',
    clusterBalloonItemContentLayout: clusterLayout,
    clusterBalloonPanelMaxMapArea: 0,
    clusterBalloonContentLayoutWidth: 200,
    clusterBalloonContentLayoutHeight: 130,
    clusterBalloonPagerSize: 3
  });
  map.geoObjects.add(cluster);
  (0,_js_placemark_js__WEBPACK_IMPORTED_MODULE_2__.setExistingPlacemarks)(cluster, balloonOpenHandler);
}

function balloonOpenHandler(coords) {
  var form = document.querySelector('.review');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var reviewData = (0,_js_util_js__WEBPACK_IMPORTED_MODULE_1__.getFormInput)(form);
    if (!reviewData) return;
    (0,_js_util_js__WEBPACK_IMPORTED_MODULE_1__.saveData)(coords, reviewData);
    var placemark = (0,_js_placemark_js__WEBPACK_IMPORTED_MODULE_2__.findPlacemark)(coords, cluster);

    if (!placemark) {
      placemark = (0,_js_placemark_js__WEBPACK_IMPORTED_MODULE_2__.createPlacemark)(coords, cluster, balloonOpenHandler);
    }

    (0,_js_placemark_js__WEBPACK_IMPORTED_MODULE_2__.updatePlacemarkContent)(placemark);
    map.balloon.close();
  });
}

ymaps.ready(init);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cEUsTUFBNUIsRUFBb0M7QUFDbEMsTUFBTWdDLElBQUksR0FBR2EsUUFBUSxDQUFDSSxhQUFULENBQXVCLFNBQXZCLENBQWI7QUFDQSxNQUFJLENBQUNqQixJQUFMLEVBQVc7QUFFWEEsRUFBQUEsSUFBSSxDQUFDYyxnQkFBTCxDQUFzQixRQUF0QixFQUFnQyxVQUFDQyxDQUFELEVBQU87QUFDckNBLElBQUFBLENBQUMsQ0FBQ0ksY0FBRjtBQUVBLFFBQU1YLFVBQVUsR0FBR1QseURBQVksQ0FBQ0MsSUFBRCxDQUEvQjtBQUNBLFFBQUksQ0FBQ1EsVUFBTCxFQUFpQjtBQUVqQkQsSUFBQUEscURBQVEsQ0FBQ3ZDLE1BQUQsRUFBU3dDLFVBQVQsQ0FBUjtBQUVBLFFBQUl4RCxTQUFTLEdBQUdvQiwrREFBYSxDQUFDSixNQUFELEVBQVN4QixPQUFULENBQTdCOztBQUNBLFFBQUksQ0FBQ1EsU0FBTCxFQUFnQjtBQUNkQSxNQUFBQSxTQUFTLEdBQUdDLGlFQUFlLENBQUNlLE1BQUQsRUFBU3hCLE9BQVQsRUFBa0I0RixrQkFBbEIsQ0FBM0I7QUFDRDs7QUFDRGpGLElBQUFBLHdFQUFzQixDQUFDSCxTQUFELENBQXRCO0FBQ0E4RSxJQUFBQSxHQUFHLENBQUNTLE9BQUosQ0FBWW9CLEtBQVo7QUFDRCxHQWREO0FBZUQ7O0FBRUR0SCxLQUFLLENBQUN1SCxLQUFOLENBQVk3QixJQUFaLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93c2NoYXQvLi9zcmMvanMvcGxhY2VtYXJrLmpzIiwid2VicGFjazovL3dzY2hhdC8uL3NyYy9qcy9yZXZpZXdTdG9yYWdlLmpzIiwid2VicGFjazovL3dzY2hhdC8uL3NyYy9qcy90ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly93c2NoYXQvLi9zcmMvanMvdXRpbC5qcyIsIndlYnBhY2s6Ly93c2NoYXQvLi9zcmMvY3NzL21haW4uY3NzIiwid2VicGFjazovL3dzY2hhdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd3NjaGF0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd3NjaGF0Ly4vc3JjL2Nzcy9tYWluLmNzcz8yYzlmIiwid2VicGFjazovL3dzY2hhdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93c2NoYXQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dzY2hhdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93c2NoYXQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd3NjaGF0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd3NjaGF0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd3NjaGF0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dzY2hhdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93c2NoYXQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dzY2hhdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dzY2hhdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dzY2hhdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmV2aWV3U3RvcmFnZSBmcm9tICcuL3Jldmlld1N0b3JhZ2UuanMnO1xuaW1wb3J0IHt0ZW1wbGF0ZVJldmlld3MsIHRlbXBsYXRlRm9ybSwgZmlsbFRlbXBsYXRlfSBmcm9tICcuL3RlbXBsYXRlLmpzJztcblxuY29uc3QgeW1hcHMgPSB3aW5kb3cueW1hcHM7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRFeGlzdGluZ1BsYWNlbWFya3MoY2x1c3RlciwgaGFuZGxlcikge1xuICBjb25zdCByZXZpZXdNYXAgPSBuZXcgUmV2aWV3U3RvcmFnZSgpLmdldFJldmlld3MoKTtcblxuICBPYmplY3Qua2V5cyhyZXZpZXdNYXApLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IHBsYWNlbWFyayA9IGNyZWF0ZVBsYWNlbWFyayhrZXkuc3BsaXQoJywnKSwgY2x1c3RlciwgaGFuZGxlcik7XG4gICAgdXBkYXRlUGxhY2VtYXJrQ29udGVudChwbGFjZW1hcmspO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVBsYWNlbWFya0NvbnRlbnQocGxhY2VtYXJrKSB7XG4gIGlmICghcGxhY2VtYXJrKSByZXR1cm47XG5cbiAgY29uc3QgcmV2aWV3cyA9IG5ldyBSZXZpZXdTdG9yYWdlKCkuZ2V0UmV2aWV3cyhwbGFjZW1hcmsuZ2VvbWV0cnkuZ2V0Q29vcmRpbmF0ZXMoKSk7XG5cbiAgaWYgKHJldmlld3MubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgY29uc3QgcmV2aWV3c0hUTUwgPSBmaWxsVGVtcGxhdGUodGVtcGxhdGVSZXZpZXdzLCByZXZpZXdzKTtcblxuICBwbGFjZW1hcmsucHJvcGVydGllcy5zZXQoe1xuICAgIGJhbGxvb25Db250ZW50Qm9keTogcmV2aWV3c0hUTUwsXG4gICAgYmFsbG9vbkNvbnRlbnRGb290ZXI6IHRlbXBsYXRlRm9ybSxcbiAgICBpY29uQ29udGVudDogcmV2aWV3cy5sZW5ndGggPiAxID8gcmV2aWV3cy5sZW5ndGggOiAnJyxcbiAgfSk7XG5cbiAgcGxhY2VtYXJrLm9wdGlvbnMuc2V0KHtcbiAgICBwcmVzZXQ6IHJldmlld3MubGVuZ3RoID4gMSA/ICdpc2xhbmRzI2JsdWVDaXJjbGVJY29uJyA6ICcnLFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYWNlbWFyayhjb29yZHMsIGNsdXN0ZXIsIGhhbmRsZXIpIHtcbiAgY29uc3QgcGxhY2VtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhjb29yZHMpO1xuXG4gIHBsYWNlbWFyay5ldmVudHMuYWRkKCdiYWxsb29ub3BlbicsICgpID0+IHtcbiAgICBoYW5kbGVyKGNvb3Jkcyk7XG4gIH0pO1xuXG4gIGNsdXN0ZXIuYWRkKHBsYWNlbWFyayk7XG5cbiAgcmV0dXJuIHBsYWNlbWFyaztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRQbGFjZW1hcmsoY29vcmRzLCBjbHVzdGVyKSB7XG4gIGZvciAoY29uc3QgaXRlbSBvZiBjbHVzdGVyLmdldEdlb09iamVjdHMoKSkge1xuICAgIGlmIChpdGVtLmdlb21ldHJ5LmdldFR5cGUoKSA9PT0gJ1BvaW50JyAmJiBpdGVtLmdlb21ldHJ5LmdldENvb3JkaW5hdGVzKCkgPT09IGNvb3JkcylcbiAgICAgIHJldHVybiBpdGVtO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBSZXZpZXdTdG9yYWdlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pdGVtTmFtZSA9ICdyZXZpZXdTdG9yZSc7XG5cbiAgICB0aGlzLmRhdGEgPSBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLml0ZW1OYW1lKSk7XG5cbiAgICBpZiAoIXRoaXMuZGF0YSkge1xuICAgICAgdGhpcy5kYXRhID0ge307XG4gICAgfVxuICB9XG5cbiAgc2V0RGF0YSgpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5pdGVtTmFtZSwgSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKSk7XG4gIH1cblxuICBhZGRSZXZpZXcoY29vcmRzLCByZXZpZXcpIHtcbiAgICBjb25zdCBrZXkgPSBjb29yZHMudG9TdHJpbmcoKTtcblxuICAgIGlmICghdGhpcy5kYXRhW2tleV0pIHtcbiAgICAgIHRoaXMuZGF0YVtrZXldID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0YVtrZXldLnB1c2gocmV2aWV3KTtcbiAgICAgIHRoaXMuc2V0RGF0YSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldFJldmlld3MoY29vcmRzKSB7XG4gICAgaWYgKCFjb29yZHMpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGtleSA9IGNvb3Jkcy50b1N0cmluZygpO1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YVtrZXldID8gdGhpcy5kYXRhW2tleV0gOiBbXTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCB0ZW1wbGF0ZVJldmlld3MgPSBgXG4gIDx1bCBjbGFzcz1cImxlZnQtcmV2aWV3c1wiPlxuICAgIDxsaSBjbGFzcz1cImxlZnQtcmV2aWV3XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibGVmdC1yZXZpZXdfX3RpdGxlXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibGVmdC1yZXZpZXdfX2F1dGhvclwiPiB7e25hbWV9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJsZWZ0LXJldmlld19fcGxhY2VcIj4ge3twbGFjZX19PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImxlZnQtcmV2aWV3X19kYXRlXCI+IHt7ZGF0ZX19PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibGVmdC1yZXZpZXdfX3RleHRcIj4ge3tyZXZpZXd9fTwvZGl2PlxuICAgIDwvbGk+XG4gIDwvdWw+YDtcblxuZXhwb3J0IGNvbnN0IHRlbXBsYXRlRm9ybSA9IGBcbiAgPGZvcm0gY2xhc3M9XCJyZXZpZXdcIiBpZD1cInJldmlld1wiPlxuICAgIDxkaXYgY2xhc3M9XCJyZXZpZXdfX2hlYWRpbmdcIj7QntGC0LfRi9CyOjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJyZXZpZXdfX2lucHV0c1wiPlxuICAgICAgPGlucHV0IGNsYXNzPVwicmV2aWV3X19pbnB1dCBpbnB1dC0tbmFtZVwiIG5hbWU9XCJuYW1lXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cItCj0LrQsNC20LjRgtC1INCy0LDRiNC1INC40LzRj1wiPlxuICAgICAgPGlucHV0IGNsYXNzPVwicmV2aWV3X19pbnB1dCBpbnB1dC0tcGxhY2VcIiBuYW1lPVwicGxhY2VcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwi0KPQutCw0LbQuNGC0LUg0LzQtdGB0YLQvlwiPlxuICAgICAgPGlucHV0IGNsYXNzPVwicmV2aWV3X19pbnB1dCBpbnB1dC0tcmV2aWV3XCIgbmFtZT1cInJldmlld1wiIHR5cGU9XCJ0ZXh0YXJlYVwiIHBsYWNlaG9sZGVyPVwi0J7RgdGC0LDQstC40YLRjCDQvtGC0LfRi9CyXCI+XG4gICAgPC9kaXY+XG4gICAgPGJ1dHRvbiBjbGFzcz1cInJldmlld19fYnRuXCIgdHlwZT1cInN1Ym1pdFwiPtCU0L7QsdCw0LLQuNGC0Yw8L2J1dHRvbj5cbiAgPC9mb3JtPmA7XG5cbmV4cG9ydCBjb25zdCB0ZW1wbGF0ZUNsdXN0ZXJMYXlvdXQgPVxuICAnPGRpdiBjbGFzcz1iYWxsb25fYm9keT57eyBwcm9wZXJ0aWVzLmJhbGxvb25Db250ZW50Qm9keXxyYXcgfX08L2Rpdj4nO1xuXG5leHBvcnQgZnVuY3Rpb24gZmlsbFRlbXBsYXRlKHRlbXBsYXRlLCBhcnJheSkge1xuICBsZXQgaHRtbCA9ICcnO1xuXG4gIGFycmF5LmZvckVhY2goKG9iaikgPT4ge1xuICAgIGxldCBidWYgPSB0ZW1wbGF0ZTtcbiAgICBjb25zdCBtYXRjaGVzID0gYnVmLm1hdGNoQWxsKCd7e1tec31dKn19Jyk7XG5cbiAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIG1hdGNoZXMpIHtcbiAgICAgIGNvbnN0IGtleSA9IG1hdGNoWzBdLnN1YnN0cmluZygyLCBtYXRjaFswXS5sZW5ndGggLSAyKTtcbiAgICAgIGJ1ZiA9IGJ1Zi5yZXBsYWNlKG1hdGNoWzBdLCBvYmpba2V5XSA/IG9ialtrZXldIDogJycpO1xuICAgIH1cblxuICAgIGh0bWwgKz0gYnVmO1xuICB9KTtcblxuICByZXR1cm4gaHRtbDtcbn1cbiIsImltcG9ydCBSZXZpZXdTdG9yYWdlIGZyb20gJy4vcmV2aWV3U3RvcmFnZS5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGb3JtSW5wdXQoZm9ybSkge1xuICBjb25zdCBpbnB1dCA9IHtcbiAgICBuYW1lOiBmb3JtLmVsZW1lbnRzLm5hbWUsXG4gICAgcGxhY2U6IGZvcm0uZWxlbWVudHMucGxhY2UsXG4gICAgcmV2aWV3OiBmb3JtLmVsZW1lbnRzLnJldmlldyxcbiAgfTtcblxuICBpZiAodmFsaWRhdGVGb3JtKGlucHV0KSkge1xuICAgIGlucHV0Q2hlY2soKTtcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVEYXRhKGNvb3JkcywgcmV2aWV3RGF0YSkge1xuICBjb25zdCByZXZpZXcgPSByZXZpZXdEYXRhO1xuXG4gIE9iamVjdC5rZXlzKHJldmlldykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgcmV2aWV3W2tleV0gPSByZXZpZXdba2V5XS52YWx1ZTtcbiAgfSk7XG5cbiAgcmV2aWV3WydkYXRlJ10gPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDEwKTtcbiAgbmV3IFJldmlld1N0b3JhZ2UoKS5hZGRSZXZpZXcoY29vcmRzLCByZXZpZXcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5wdXRDaGVjaygpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUudGFyZ2V0ID09PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtLW5hbWUnKSkge1xuICAgICAgbGV0IGlzRGlnaXQgPSBmYWxzZTtcblxuICAgICAgaWYgKGUua2V5ID49IDAgfHwgZS5rZXkgPD0gOSkge1xuICAgICAgICBpc0RpZ2l0ID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRGlnaXQgPT09IHRydWUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUZvcm0oaW5wdXQpIHtcbiAgbGV0IGlzVmFsaWQgPSB0cnVlO1xuXG4gIGZvciAoY29uc3Qga2V5IGluIGlucHV0KSB7XG4gICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKGlucHV0LCBrZXkpKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gaW5wdXRba2V5XTtcblxuICAgICAgY29uc3QgdmFsaWQgPSB2YWxpZGF0ZUZpZWxkKGVsZW1lbnQpO1xuICAgICAgaWYgKCF2YWxpZCkge1xuICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVGaWVsZChmaWVsZCkge1xuICAgIGlmICghZmllbGQudmFsdWUudHJpbSgpLmxlbmd0aCkge1xuICAgICAgZmllbGQuY2xhc3NMaXN0LmFkZCgncmV2aWV3X19pbnB1dC0tZXJyb3InKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmllbGQuY2xhc3NMaXN0LnJlbW92ZSgncmV2aWV3X19pbnB1dC0tZXJyb3InKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaXNWYWxpZDtcbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiaHRtbCB7XFxuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJlaWdlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbmJvZHkge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbnVsIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbnVsIGxpIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbmhyIHtcXG4gIGJvcmRlcjogbm9uZTsgXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRTdFN0U3OyBcXG4gIGhlaWdodDogMXB4OyBcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuOjotd2Via2l0LXNjcm9sbGJhciB7XFxuICB3aWR0aDogM3B4O1xcblxcbn1cXG5cXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNDNEM0QzQ7XFxufVxcblxcblxcbi5oaWRkZW4ge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4ubWFwIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4ubGVmdC1yZXZpZXdzIHtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGNvbG9yOiAjOEY4RjhGO1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIG1heC1oZWlnaHQ6IDEwMHB4O1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi5sZWZ0LXJldmlldyB7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbn1cXG5cXG4ubGVmdC1yZXZpZXc6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbn1cXG5cXG4ubGVmdC1yZXZpZXdfX3RpdGxlIHtcXG4gIG1hcmdpbi1ib3R0b206IDVweDtcXG59XFxuXFxuLmxlZnQtcmV2aWV3X19hdXRob3Ige1xcbiAgY29sb3I6ICMwMDA7XFxufVxcblxcbi5yZXZpZXcge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gIHBhZGRpbmctdG9wOiAxMHB4O1xcbn1cXG5cXG4ucmV2aWV3X19oZWFkaW5nIHtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgY29sb3I6ICMwMDA7XFxufVxcblxcbi5yZXZpZXdfX2lucHV0cyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIHdpZHRoOiAxMDAlO1xcblxcbn1cXG5cXG4ucmV2aWV3X19pbnB1dCB7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgcGFkZGluZzogMTFweCAxMXB4O1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogODUlO1xcbn1cXG5cXG4ucmV2aWV3X19pbnB1dDpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxufVxcblxcbi5yZXZpZXdfX2lucHV0OjpwbGFjZWhvbGRlciB7XFxuICBjb2xvcjogIzAwMDtcXG59XFxuXFxuLnJldmlld19faW5wdXQtLWVycm9yIHtcXG4gIGJvcmRlci1jb2xvcjogcmVkO1xcbn1cXG5cXG4ucmV2aWV3X19idG4ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGODY2MztcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyOiAwcHg7XFxuICBwYWRkaW5nOiAxMHB4IDE2cHg7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxufVxcbi5yZXZpZXdfX2J0bjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzI1ZTQyO1xcbn1cXG5cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvY3NzL21haW4uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UseUNBQXlDO0VBQ3pDLHVCQUF1QjtFQUN2QixXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0FBQ1o7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLFdBQVc7RUFDWCxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxVQUFVOztBQUVaOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOzs7QUFHQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGNBQWM7RUFDZCxtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsV0FBVzs7QUFFYjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsY0FBYztFQUNkLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixXQUFXO0VBQ1gsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLHlCQUF5QjtBQUMzQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJodG1sIHtcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmVpZ2U7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuYm9keSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxudWwge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxudWwgbGkge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuaHIge1xcbiAgYm9yZGVyOiBub25lOyBcXG4gIGJhY2tncm91bmQtY29sb3I6ICNFN0U3RTc7IFxcbiAgaGVpZ2h0OiAxcHg7IFxcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcXG4gIHdpZHRoOiAzcHg7XFxuXFxufVxcblxcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0M0QzRDNDtcXG59XFxuXFxuXFxuLmhpZGRlbiB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbi5tYXAge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5sZWZ0LXJldmlld3Mge1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgY29sb3I6ICM4RjhGOEY7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgbWF4LWhlaWdodDogMTAwcHg7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLmxlZnQtcmV2aWV3IHtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxufVxcblxcbi5sZWZ0LXJldmlldzpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxufVxcblxcbi5sZWZ0LXJldmlld19fdGl0bGUge1xcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbn1cXG5cXG4ubGVmdC1yZXZpZXdfX2F1dGhvciB7XFxuICBjb2xvcjogIzAwMDtcXG59XFxuXFxuLnJldmlldyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgcGFkZGluZy10b3A6IDEwcHg7XFxufVxcblxcbi5yZXZpZXdfX2hlYWRpbmcge1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBjb2xvcjogIzAwMDtcXG59XFxuXFxuLnJldmlld19faW5wdXRzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuXFxufVxcblxcbi5yZXZpZXdfX2lucHV0IHtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICBwYWRkaW5nOiAxMXB4IDExcHg7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiA4NSU7XFxufVxcblxcbi5yZXZpZXdfX2lucHV0Omxhc3QtY2hpbGQge1xcbiAgbWFyZ2luLWJvdHRvbTogMDtcXG59XFxuXFxuLnJldmlld19faW5wdXQ6OnBsYWNlaG9sZGVyIHtcXG4gIGNvbG9yOiAjMDAwO1xcbn1cXG5cXG4ucmV2aWV3X19pbnB1dC0tZXJyb3Ige1xcbiAgYm9yZGVyLWNvbG9yOiByZWQ7XFxufVxcblxcbi5yZXZpZXdfX2J0biB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkY4NjYzO1xcbiAgY29sb3I6ICNmZmY7XFxuICBib3JkZXI6IDBweDtcXG4gIHBhZGRpbmc6IDEwcHggMTZweDtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG59XFxuLnJldmlld19fYnRuOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNjMjVlNDI7XFxufVxcblxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4uY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vY3NzL21haW4uY3NzJztcblxuaW1wb3J0IHtnZXRGb3JtSW5wdXQsIHNhdmVEYXRhLCBpbnB1dENoZWNrLCB2YWxpZGF0ZUZvcm19IGZyb20gJy4vanMvdXRpbC5qcyc7XG5pbXBvcnQge3NldEV4aXN0aW5nUGxhY2VtYXJrcywgdXBkYXRlUGxhY2VtYXJrQ29udGVudCwgY3JlYXRlUGxhY2VtYXJrLCBmaW5kUGxhY2VtYXJrfSBmcm9tICcuL2pzL3BsYWNlbWFyay5qcyc7XG5pbXBvcnQge3RlbXBsYXRlUmV2aWV3cywgdGVtcGxhdGVGb3JtLCB0ZW1wbGF0ZUNsdXN0ZXJMYXlvdXQsIGZpbGxUZW1wbGF0ZX0gZnJvbSAnLi9qcy90ZW1wbGF0ZS5qcyc7XG5cbmNvbnN0IHltYXBzID0gd2luZG93LnltYXBzO1xuXG5sZXQgbWFwO1xubGV0IGNsdXN0ZXI7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIG1hcCA9IG5ldyB5bWFwcy5NYXAoJ21hcCcsIHtcbiAgICBjZW50ZXI6IFs1NS43NiwgMzcuNjRdLFxuICAgIGJlaGF2aW9yczogWydkYmxjbGlja3pvb20nLCAnZHJhZyddLFxuICAgIHpvb206IDExLFxuICB9KTtcbiAgbWFwLmV2ZW50cy5hZGQoJ2JhbGxvb25vcGVuJywgKGUpID0+IHtcbiAgICBiYWxsb29uT3BlbkhhbmRsZXIoZS5vcmlnaW5hbEV2ZW50LmN1cnJlbnRUYXJnZXQuYmFsbG9vbi5fYmFsbG9vbi5fcG9zaXRpb24pO1xuICB9KTtcbiAgbWFwLmV2ZW50cy5hZGQoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBjb25zdCBjb29yZHMgPSBlLmdldCgnY29vcmRzJyk7XG4gICAgbWFwLmJhbGxvb24ub3Blbihjb29yZHMsIHtcbiAgICAgIGNvbnRlbnQ6IHRlbXBsYXRlRm9ybSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgY29uc3QgY2x1c3RlckxheW91dCA9IHltYXBzLnRlbXBsYXRlTGF5b3V0RmFjdG9yeS5jcmVhdGVDbGFzcyhcbiAgICB0ZW1wbGF0ZUNsdXN0ZXJMYXlvdXRcbiAgKTtcbiAgY2x1c3RlciA9IG5ldyB5bWFwcy5DbHVzdGVyZXIoe1xuICAgIGdyaWRTaXplOiAxMDAsXG4gICAgY2x1c3RlckRpc2FibGVDbGlja1pvb206IHRydWUsXG4gICAgY2x1c3Rlck9wZW5CYWxsb29uT25DbGljazogdHJ1ZSxcbiAgICBjbHVzdGVyQmFsbG9vbkNvbnRlbnRMYXlvdXQ6ICdjbHVzdGVyI2JhbGxvb25DYXJvdXNlbCcsXG4gICAgY2x1c3RlckJhbGxvb25JdGVtQ29udGVudExheW91dDogY2x1c3RlckxheW91dCxcbiAgICBjbHVzdGVyQmFsbG9vblBhbmVsTWF4TWFwQXJlYTogMCxcbiAgICBjbHVzdGVyQmFsbG9vbkNvbnRlbnRMYXlvdXRXaWR0aDogMjAwLFxuICAgIGNsdXN0ZXJCYWxsb29uQ29udGVudExheW91dEhlaWdodDogMTMwLFxuICAgIGNsdXN0ZXJCYWxsb29uUGFnZXJTaXplOiAzLFxuICB9KTtcbiAgbWFwLmdlb09iamVjdHMuYWRkKGNsdXN0ZXIpO1xuICBzZXRFeGlzdGluZ1BsYWNlbWFya3MoY2x1c3RlciwgYmFsbG9vbk9wZW5IYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gYmFsbG9vbk9wZW5IYW5kbGVyKGNvb3Jkcykge1xuICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldmlldycpO1xuICBpZiAoIWZvcm0pIHJldHVybjtcblxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3QgcmV2aWV3RGF0YSA9IGdldEZvcm1JbnB1dChmb3JtKTtcbiAgICBpZiAoIXJldmlld0RhdGEpIHJldHVybjtcblxuICAgIHNhdmVEYXRhKGNvb3JkcywgcmV2aWV3RGF0YSk7XG5cbiAgICBsZXQgcGxhY2VtYXJrID0gZmluZFBsYWNlbWFyayhjb29yZHMsIGNsdXN0ZXIpO1xuICAgIGlmICghcGxhY2VtYXJrKSB7XG4gICAgICBwbGFjZW1hcmsgPSBjcmVhdGVQbGFjZW1hcmsoY29vcmRzLCBjbHVzdGVyLCBiYWxsb29uT3BlbkhhbmRsZXIpO1xuICAgIH1cbiAgICB1cGRhdGVQbGFjZW1hcmtDb250ZW50KHBsYWNlbWFyayk7XG4gICAgbWFwLmJhbGxvb24uY2xvc2UoKTtcbiAgfSk7XG59XG5cbnltYXBzLnJlYWR5KGluaXQpO1xuIl0sIm5hbWVzIjpbIlJldmlld1N0b3JhZ2UiLCJ0ZW1wbGF0ZVJldmlld3MiLCJ0ZW1wbGF0ZUZvcm0iLCJmaWxsVGVtcGxhdGUiLCJ5bWFwcyIsIndpbmRvdyIsInNldEV4aXN0aW5nUGxhY2VtYXJrcyIsImNsdXN0ZXIiLCJoYW5kbGVyIiwicmV2aWV3TWFwIiwiZ2V0UmV2aWV3cyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwicGxhY2VtYXJrIiwiY3JlYXRlUGxhY2VtYXJrIiwic3BsaXQiLCJ1cGRhdGVQbGFjZW1hcmtDb250ZW50IiwicmV2aWV3cyIsImdlb21ldHJ5IiwiZ2V0Q29vcmRpbmF0ZXMiLCJsZW5ndGgiLCJyZXZpZXdzSFRNTCIsInByb3BlcnRpZXMiLCJzZXQiLCJiYWxsb29uQ29udGVudEJvZHkiLCJiYWxsb29uQ29udGVudEZvb3RlciIsImljb25Db250ZW50Iiwib3B0aW9ucyIsInByZXNldCIsImNvb3JkcyIsIlBsYWNlbWFyayIsImV2ZW50cyIsImFkZCIsImZpbmRQbGFjZW1hcmsiLCJnZXRHZW9PYmplY3RzIiwiaXRlbSIsImdldFR5cGUiLCJpdGVtTmFtZSIsImRhdGEiLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsInJldmlldyIsInRvU3RyaW5nIiwicHVzaCIsInNldERhdGEiLCJ0ZW1wbGF0ZUNsdXN0ZXJMYXlvdXQiLCJ0ZW1wbGF0ZSIsImFycmF5IiwiaHRtbCIsIm9iaiIsImJ1ZiIsIm1hdGNoZXMiLCJtYXRjaEFsbCIsIm1hdGNoIiwic3Vic3RyaW5nIiwicmVwbGFjZSIsImdldEZvcm1JbnB1dCIsImZvcm0iLCJpbnB1dCIsIm5hbWUiLCJlbGVtZW50cyIsInBsYWNlIiwidmFsaWRhdGVGb3JtIiwiaW5wdXRDaGVjayIsInNhdmVEYXRhIiwicmV2aWV3RGF0YSIsInZhbHVlIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiYWRkUmV2aWV3IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsInF1ZXJ5U2VsZWN0b3IiLCJpc0RpZ2l0IiwicHJldmVudERlZmF1bHQiLCJpc1ZhbGlkIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiZWxlbWVudCIsInZhbGlkIiwidmFsaWRhdGVGaWVsZCIsImZpZWxkIiwidHJpbSIsImNsYXNzTGlzdCIsInJlbW92ZSIsIm1hcCIsImluaXQiLCJNYXAiLCJjZW50ZXIiLCJiZWhhdmlvcnMiLCJ6b29tIiwiYmFsbG9vbk9wZW5IYW5kbGVyIiwib3JpZ2luYWxFdmVudCIsImN1cnJlbnRUYXJnZXQiLCJiYWxsb29uIiwiX2JhbGxvb24iLCJfcG9zaXRpb24iLCJnZXQiLCJvcGVuIiwiY29udGVudCIsImNsdXN0ZXJMYXlvdXQiLCJ0ZW1wbGF0ZUxheW91dEZhY3RvcnkiLCJjcmVhdGVDbGFzcyIsIkNsdXN0ZXJlciIsImdyaWRTaXplIiwiY2x1c3RlckRpc2FibGVDbGlja1pvb20iLCJjbHVzdGVyT3BlbkJhbGxvb25PbkNsaWNrIiwiY2x1c3RlckJhbGxvb25Db250ZW50TGF5b3V0IiwiY2x1c3RlckJhbGxvb25JdGVtQ29udGVudExheW91dCIsImNsdXN0ZXJCYWxsb29uUGFuZWxNYXhNYXBBcmVhIiwiY2x1c3RlckJhbGxvb25Db250ZW50TGF5b3V0V2lkdGgiLCJjbHVzdGVyQmFsbG9vbkNvbnRlbnRMYXlvdXRIZWlnaHQiLCJjbHVzdGVyQmFsbG9vblBhZ2VyU2l6ZSIsImdlb09iamVjdHMiLCJjbG9zZSIsInJlYWR5Il0sInNvdXJjZVJvb3QiOiIifQ==