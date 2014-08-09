define(function(require) {
  'use strict';

  var Backbone = require('backbone')
    , wizardTpl = require('tpl/apps/Wizard/steps/random/template')
    , g = {
      view: require('apps/Wizard/steps/summary/view'),
      title:'3g',
      intro:'3ggg'
    }

    , wifi = {
      view: require('apps/Wizard/steps/summary/view'),
      title:'wifi',
      intro:'wiifi'
    }

    , APP = require('app')

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
      if(event.currentTarget.id == '3g'){
        APP.wizard.addStep(g);
      }
      else{
        APP.wizard.addStep(wifi);
      }
    },

    render: function() {
      $(this.el).html(this.template());
      return this;
    }

  });
});