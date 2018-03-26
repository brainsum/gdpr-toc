// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({3:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var functions = {
  ready: function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
};

exports.default = functions;
},{}],1:[function(require,module,exports) {
'use strict';

var _functions = require('./functions');

var _functions2 = _interopRequireDefault(_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_functions2.default.ready(function () {

  var lang = window.GDPR.lang.toUpperCase();
  var baseURL = window.GDPR.baseURL;

  var content = document.querySelector('#gdpr-toc .content');
  window.frames['eurlex'].location = 'https://eur-lex.europa.eu/legal-content/' + lang + '/TXT/?uri=celex:32016R0679';

  // TOC link clicks
  content.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      var id = event.target.href.split('#')[1];
      window.frames['eurlex'].location = event.target.href;
    }

    event.preventDefault();
    return false;
  });

  // Language selector
  var languageSelect = document.getElementById('languages');

  languageSelect.addEventListener('input', function (event) {
    console.log(event.target.value);
    window.location.replace(baseURL + event.target.value);
  });
});
},{"./functions":3}]},{},[1])
//# sourceMappingURL=/js/main.map