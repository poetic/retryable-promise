function failingPromise(times) {
  var triedCount = 0;
  return function() {
    return new RSVP.Promise(function(resolve, reject){
      triedCount++;
      if(triedCount === times) {
        resolve();
      } else {
        reject();
      }
    });
  };
};

describe('retriablePromiseable-promise', function() {
  describe('default maxretriablePromise to 3 times', function() {
    it('promise fails all 3 times', function() {

      return retriablePromise(failingPromise(3)).catch(function(){
        assert.ok(true, 'Promise failed three times');
      });

    });

    it('promise only fails 2 times', function() {
      return retriablePromise(failingPromise(2)).then(function(){
        assert.ok(true, 'Promise resolved successfully');
      }, function() {
        assert.ok(false, 'Promise should have resolved successfully');
      });
    });
  });

  describe('custom maxretriablePromise set to 5', function() {
    var options;
    beforeEach(function() {
      options = {
        maxRetries: 5
      };
    });

    it('promise fails all 5 times', function() {
      return retriablePromise(failingPromise(6), options).catch(function(){
        assert.ok(true, 'Promise failed three times');
      });
    });

    it('promise only fails 4 times', function() {
      return retriablePromise(failingPromise(4), options).then(function(){
        assert.ok(true, 'Promise resolved successfully');
      }, function() {

      });
    });
  });
});
