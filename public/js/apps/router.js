/**
 * @fileOverview Main router file
 */

/**
 * Router component Require module
 * @name RouterModule
 * @class
 * @param {Object} _ Underscore
 * @param {Object} Backbone Backbone
 * @return {Constructor} Router
 */
define(function(require) {
  'use strict';
  var Backbone = require('backbone')

  , WizardExample = require('apps/WizardExample/views/WizardExampleView')

  ;

  return Backbone.Router.extend({

    routes: {
      "": 'Wizard',
      "/": 'Wizard',
    },

    // sections

    Wizard: function(){
      $('#backbone').html( (new WizardExample()).render().el );
    },

  });

});
