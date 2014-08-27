define(function(require) {
  'use strict';

  /**
  * Module wizard Base init view
  * path: apps/wizard/views/wizard
  * @class wizard
  */

  var Backbone = require('backbone')

  // templates
  , template = require('tpl/apps/WizardExample/templates/exampleTpl')

  // just for test
  , Backbone_wizard = require('wiz')
  //Steps
  , WizardSteps = [
      { view: require('apps/WizardExample/steps/init/view'), title:'init', intro:'init slide'}
    , { view: require('apps/WizardExample/steps/process/view'), title:'process', intro:'process slide'}
    , { view: require('apps/WizardExample/steps/random/view'), title:'choose', intro:'choose slide'}
    , { view: require('apps/WizardExample/steps/finish/view'), title:'finish', intro:'finish slide'}

  ]

  ;

  return Backbone.View.extend({


    /**
    * Add initialize init
    * @name class.initialize
    * @class DictionariesBaseView
    * @constructor
    */

    initialize:function () {
      this.template = template;
      console.log('init BaseView' );
    },

    render:function () {
      console.log('rendering....' );
      var self = this;
      $(this.el).html(this.template() );

      window.wizard = new Backbone_wizard({
        el: self.$el.find('#wizardContainer'),
        steps: WizardSteps,
        tree:{
          render: true,
          // could be rect || circle, circle buy default if its not defined.
          shape:'circle'
        }
      });

      return this;
    }

  });

});