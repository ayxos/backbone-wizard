define(function() {
  'use strict';
  var App = function() {
    return {
      CONFIG: {
        path: '/',
        emulateHTTP: false
      },
      SECTIONS: {}
    };
  };
  return new App();
});
