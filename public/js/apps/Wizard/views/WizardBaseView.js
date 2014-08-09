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
  , CampaignBaseTpl = require('tpl/apps/Wizard/templates/wizardTpl')

  // just for test
  , Wizard = require('common/wizard/views/wizardBaseView')
  //Steps
  , WizardSteps = [
      { view: require('apps/Wizard/steps/finish/view'), title:'finish', intro:'lolo'}
    , { view: require('apps/Wizard/steps/init/view'), title:'init', intro:'jojo'}
    , { view: require('apps/Wizard/steps/process/view'), title:'process', intro:'baba'}
    , { view: require('apps/Wizard/steps/random/view'), title:'choose', intro:'wiii'}
  ]

  , APP = require('app')

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

      APP.wizard = new Wizard({
        el: self.$el.find('#wizard'),
        steps: WizardSteps
      });

      return this;
    }

  });

});