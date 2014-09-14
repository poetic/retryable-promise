// Node
if(typeof window === "undefined") {
  chai = require('chai');
  RSVP = require('rsvp');
  retryablePromise = require('../lib/retryable-promise');
} else {
  // Browser
}

assert = chai.assert;
