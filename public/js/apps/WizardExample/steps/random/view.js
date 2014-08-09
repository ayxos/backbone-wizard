define(function(require) {
  'use strict';

  var Backbone = require('backbone')
    , wizardTpl = require('tpl/apps/WizardExample/steps/random/template')
    , a = {
      view: require('apps/WizardExample/steps/summary/view'),
      title:'A option',
      intro:'you choose option A'
    }

    , b = {
      view: require('apps/WizardExample/steps/summary/view'),
      title:'B option',
      intro:'you choose option B'
    }

    ;

  return Backbone.View.extend({

    events:{
      'click button':'getStep'
    },

    initialize: function() {
      console.log('first wizard view');
      this.template = wizardTpl;
    },

    getStep: function(event){
      event.preventDefault();
      console.log('changing view');
      if(event.currentTarget.value == 'a'){
        window.wizard.addStep(a);
      }
      else{
        window.wizard.addStep(b);
      }
    },

    render: function() {
      $(this.el).html(this.template());
      return this;
    }

  });
});