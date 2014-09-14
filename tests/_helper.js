// Node
if(typeof window === "undefined") {
  chai = require('chai');
  RSVP = require('rsvp');
  retriablePromise = require('../lib/retriable-promise');
} else {
  // Browser
}

assert = chai.assert;
