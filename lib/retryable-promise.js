module.exports = function (fn, options) {
  if(typeof options === 'undefined' || options === null) {
    options = {};
  }

  var retriesLeft = options.maxRetry || 3;

  var timeout = options.timeout || 0;

  var retry = function() {
    return fn().catch(function(err) {
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
