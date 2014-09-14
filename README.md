# retryable-promise

A simple promise retry implementation that will retry a promise X times before
rejecting.

**Works with any compliant promise library in Node or the browser;**

## Installation

* `npm install --save retryable-promise`

## Usage

You pass in a function that returns a promise as the first argument and it will retry it up to 3 times until
failing. It returns a promise that you can chain from like normal.

You can also optionally pass in an options object as the second argument. It
accepts a `maxRetry` key to alter how many times it will retry the promise
before failing.




## Running Tests

* `npm test`

