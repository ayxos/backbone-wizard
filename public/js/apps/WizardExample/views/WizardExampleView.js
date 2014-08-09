define(function(require) {
  'use strict';

  /**
  * Module Dictionaries Base init view
  * path: apps/Dictionaries/views/DictionariesBaseView
  * @class DictionariesBaseView
  */

  require('bootstrap_3');

  var Backbone = require('backbone')

  // templates
  , CampaignBaseTpl = require('tpl/apps/WizardExample/templates/exampleTpl')

  // just for test
  , WizardExample = require('common/wizard/views/wizardBaseView')
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
      this.template = CampaignBaseTpl;
      console.log('init BaseView' );
    },

    render:function () {
      console.log('rendering....' );
      var self = this;
      $(this.el).html(this.template() );

      window.wizard = new WizardExample({
        el: self.$el.find('#wizard'),
        steps: WizardSteps
      });

      return this;
    }

  });

});