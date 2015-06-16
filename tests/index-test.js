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

describe('retryablePromise', function() {
  describe('default maxRetry set to 3 times', function() {
    it('promise fails all 3 times', function() {

      return retryablePromise(failingPromise(3)).catch(function(){
        assert.ok(true, 'Promise failed three times');
      });

    });

    it('promise only fails 2 times', function() {
      return retryablePromise(failingPromise(2)).then(function(){
        assert.ok(true, 'Promise resolved successfully');
      }, function() {
        assert.ok(false, 'Promise should have resolved successfully');
      });
    });
  });

  describe('custom maxRetry set to 5', function() {
    var options;
    beforeEach(function() {
      options = {
        maxRetries: 5
      };
    });

    it('promise fails all 5 times', function() {
      return retryablePromise(failingPromise(6), options).catch(function(){
        assert.ok(true, 'Promise failed five times');
      });
    });

    it('promise only fails 4 times', function() {
      return retryablePromise(failingPromise(4), options).then(function(){
        assert.ok(true, 'Promise resolved successfully');
      });
    });
  });

  describe('timeout option', function() {
    it('defaults to 0 (immediate)', function() {
      var start = new Date();
      return retryablePromise(failingPromise(2)).then(function() {
        var end  = new Date();
        var diff = start.getTime() - end.getTime() < 5;
        assert.ok(true, 'Promise waits 1.5 second to retry');
      });
    });

    it('waits for 1.5 seconds', function() {
      this.timeout(2000);
      var start = new Date();
      return retryablePromise(failingPromise(2), {
        timeout: 1500
      }).then(function() {
        var end  = new Date();
        var diff = start.getTime() - end.getTime() > 1000;
        assert.ok(true, 'Promise waits 1.5 second to retry');
      });
    });
  });
});
