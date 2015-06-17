# retryable-promise [![Build Status](https://travis-ci.org/poetic/retryable-promise.svg?branch=master)](https://travis-ci.org/poetic/retryable-promise)

A simple promise retry implementation that will retry a promise X times before rejecting.

**Works with any compliant promise library in Node or the browser;**

## Installation

* `npm install --save retryable-promise`

## Usage

You pass in a function that returns a promise as the first argument and it will retry it up to 3 times until
failing. It returns a promise that you can chain from like normal.

You can also optionally pass in an options object as the second argument. It accepts a `maxRetry` key to alter how many times it will retry the promise before failing. By default, a retry will be attempted immediately however, you can use the `timeout` key with a value of milliseconds to wait before retrying.

For example, to retry a promise up to 5 times and wait 1 second between each attempt:
```
return retryablePromise(yourPromise(), {
  maxRetries: 5,
  timeout: 1000
});
```

## Running Tests

* `npm test`
