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

  ;

  return Backbone.Router.extend({
    /**
     * A map bindings routes and methods
     * @name RouterModule.Router.Workspace.prototype.routes
     * @property
     */

    routes: {
      "": 'Wizard',
    },

    // sections
    /**
     * A method to render Backbone apps
     * @name loadBackbone
     * first, require this module
     * rendering Base View
     * assign to section-container div
     * @property
     */

    loadBackbone: function(appName){
      console.info("navigateTo: " + appName);
      var route = 'apps/' + appName + '/views/' + appName + 'BaseView';
      var self = this;

      require([route], function (RequireBaseView) {
        var BaseView = new RequireBaseView(self);
        $('#backbone').html( BaseView.render().el );
      });

    },

    Wizard: function(){
      this.loadBackbone('Wizard');
    },

  });

});
