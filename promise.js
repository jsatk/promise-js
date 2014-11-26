//window = this. undefined = undefined.
;(function (window, undefined) {

  'use strict';

  // MY SOLUTION
  var Promise = function () {
    // Caching so we do not have to recreate the state strings over and over.
    this.states = {
      PENDING:    'pending',
      FULFILLED:  'fulfilled',
      REJECTED:   'rejected'
    };

    this.currentState = this.states.PENDING;
  };

  Promise.prototype = {
    resolve: function (newValue) {
      if (typeof this.value !== 'undefined') { throw new Error('You may only resolve a promise once.'); }

      this.value        = newValue;
      this.currentState = this.states.FULFILLED;

      if (this.deferred) {
        this.handler(this.deferred);
      }
    },

    handler: function (callback) {
      if (this.currentState === 'pending') {
        this.deferred = callback;
        return;
      }

      if (Array.isArray(callback)) {
        callback.forEach(function (func) {
          func(this.value);
        }.bind(this));
      } else {
        callback(this.value);
      }
    },

    success: function () {
      var callback;

      if (arguments.length > 1) {
        callback = Array.prototype.slice.call(arguments);
      } else {
        callback = arguments[0];
      }

      if (!callback) {
        throw new Error('You must pass in a callback function to be called on success!');
      }

      this.handler(callback);
    }
  };

  window.Promise = Promise || {};

}(this));
