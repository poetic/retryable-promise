!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.retryablePromise=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function (fn, options) {
  if(typeof options === 'undefined' || options === null) {
    options = {};
  }

  var maxRetry = options.maxRetry || 3;
  var retriesLeft = maxRetry;

  var retry = function() {
    var tryCount = maxRetry - retriesLeft + 1;

    return fn(tryCount).catch(function(err){
      if(retriesLeft === 0) {
        throw err;
      }
      retriesLeft--;
      return retry();
    });
  };

  return retry();
};

},{}]},{},[1])(1)
});