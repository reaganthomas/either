(function() {
  'use strict';

  var assert = require('assert');
  var laws = require('laws');
  var Either = require('../../lib');
  var make = function(a){ return Either.Right(a); };

  describe('Algebraic laws', function() {
    describe(': Functor', function() {
      it('1. Identity', function() {
        laws.functor.identity(make);
      });

      it('2. Composition', function() {
        laws.functor.composition(make);
      });
    });
  });
})();
