var mergeTrees = require('broccoli-merge-trees');
var pickFiles  = require('broccoli-static-compiler');
var env        = require('broccoli-env').getEnv();

var sourceTrees = [];

if (env === 'development') {
  var rsvp = pickFiles('node_modules/rsvp/dist', {
      srcDir: '/',
      files: ['rsvp.js'],
      destDir: '/rsvp'
  });
  sourceTrees.push(rsvp);
  var chai = pickFiles('node_modules/chai', {
      srcDir: '/',
      files: ['chai.js'],
      destDir: '/chai'
  });
  sourceTrees.push(chai);
}

module.exports = mergeTrees(sourceTrees);
