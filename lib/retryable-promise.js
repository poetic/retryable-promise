module.exports = function (fn, options) {
  var RSVP = require('rsvp');

  if(typeof options === 'undefined' || options === null) {
    options = {};
  }

  var maxRetry = options.maxRetry || 3;
  var retriesLeft = maxRetry;

  var timeout = options.timeout || 0;

  var retry = function() {
    var tryCount = maxRetry - retriesLeft + 1;

    return fn(tryCount).catch(function(err) {
      if(retriesLeft === 0) {
        throw err;
      }

      retriesLeft--;

      return new RSVP.Promise(function(resolve, reject) {
        return setTimeout(function() {
          resolve(retry());
        }, timeout);
      });
    });
  };

  return retry();
};
