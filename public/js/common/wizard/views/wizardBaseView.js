define(function(require) {
  'use strict';

  var Backbone = require('backbone')
    , MyModel = require('common/wizard/entities/wizardModel')
    , WizardInit = require('common/wizard/views/wizardInitView')
  ;

  return Backbone.View.extend({

    initialize: function(arg) {
      _.bindAll(this, 'render', 'wizardMethod');
      this.steps = this.turnSteps(arg.steps);
      this.render();
    },

    turnSteps:function(WizardSteps){
      this.steps = [];
      console.log('number of slides', WizardSteps.length);

      for(var i=0; i<WizardSteps.length;i++){
        this.steps.push({
          step_number  :        i,
          title        :        WizardSteps[i].title,
          instructions :        WizardSteps[i].intro,
          view         :        new WizardSteps[i].view()
        });
      }
      return this.steps;
    },

    render: function() {
      this.wizardMethod();
      return this;
    },

    addStep:function(step){
      console.log('adding step WBV');
      this.wizard.addStep({
        step_number  :        window.wizard.wizard.currentStep + 1,
        title        :        step.title,
        instructions :        step.intro,
        view         :        new step.view()
      });
    },

    wizardMethod: function() {
      var myModel = new MyModel();
      var steps = this.steps;

      this.wizard = new WizardInit({
        model : myModel,
        steps : steps
      });

      console.log('view',this.wizard);

      $(this.el).html(this.wizard.render().el);
    }
  });
});