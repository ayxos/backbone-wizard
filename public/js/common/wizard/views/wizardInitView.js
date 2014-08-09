define(function(require) {
  'use strict';

  var Backbone = require('backbone')
    , wizardTpl = require('tpl/common/wizard/templates/wizardTpl')
  ;

  return Backbone.View.extend({

    id: 'wizard',

    events: {
      "click #next_step_button" : "nextStep",
      "click #prev_step_button" : "prevStep",
      "click #progress_indicator > label": "goToStep"
    },

    initialize: function(arg) {
      _.bindAll(this, 'render');
      console.log('arg',arg);
      this.model = arg.model;
      this.steps = arg.steps;
      this.currentStep = 0;
      this.template = wizardTpl;
    },

    render: function() {
      $(this.el).html(this.template());

      this.progressIndicator = this.$("#progress_indicator");
      this.title = this.$("h2#step_title");
      this.instructions = this.$("p#step_instructions");
      this.currentStepContainer = this.$(".current_step_container");
      this.nextStepButton = this.$("#next_step_button");
      this.prevStepButton = this.$("#prev_step_button");

      this.renderCurrentStep();
      return this;
    },

    renderProgressIndicator: function() {
      this.progressIndicator.empty();
      _.each(this.steps, _.bind(function(step) {
        if(step.step_number <= this.currentStep){
          var el =  '<label data-step="' + step.step_number + '"><title>' + step.title + '</title><span>' + step.step_number + '</span></label>';
          this.progressIndicator.append(el);
        }
      }, this));
    },

    addStep: function(newstep){
      console.log('adding step WIV',newstep);
      console.log('steps', this.steps);

      for(var i=this.currentStep + 1;i<this.steps.length;i++){
        var auxStep = this.steps[i];
        auxStep.step_number = this.steps[i].step_number + 1;
      }

      this.steps.splice(this.currentStep + 1,0,newstep);

      this.renderCurrentStep();
    },

    renderCurrentStep: function() {
      var currentStep = this.steps[this.currentStep];
      var prevStep;
      if (!this.isFirstStep()){
        prevStep = this.steps[this.currentStep - 1];
      }
      var nextStep = this.steps[this.currentStep + 1];

      this.title.html(currentStep.title);
      this.instructions.html(currentStep.instructions);
      this.currentView = currentStep.view;
      this.currentStepContainer.html(this.currentView.render().el);

      this.renderProgressIndicator();

      if (prevStep) {
        this.prevStepButton.html("Prev: " + prevStep.title).show();
      } else {
        this.prevStepButton.hide();
      }
      if (nextStep) {
        this.nextStepButton.html("Next: " + nextStep.title);
      } else {
        this.nextStepButton.html("Finish");
      }
    },


    goToStep:function(event){
      var step = $(event.currentTarget).attr('data-step');
      console.log('click stepProgress', step);
      this.renderStep(step);
    },


    renderStep: function(step_number) {
      var currentStep = this.steps[step_number];
      var prevStep;
      if (!this.isFirstStep()){
        prevStep = this.steps[this.currentStep - 1];
      }
      var nextStep = this.steps[this.currentStep + 1];

      this.title.html(currentStep.title);
      this.instructions.html(currentStep.instructions);
      this.currentView = currentStep.view;
      this.currentStepContainer.html(this.currentView.render().el);

      this.renderProgressIndicator();

      if (prevStep) {
        this.prevStepButton.html("Prev: " + prevStep.title).show();
      } else {
        this.prevStepButton.hide();
      }
      if (nextStep) {
        this.nextStepButton.html("Next: " + nextStep.title);
      } else {
        this.nextStepButton.html("Finish");
      }
    },

    nextStep: function() {
      if (!this.isLastStep()) {
        this.currentStep += 1;
        this.renderCurrentStep();
      } else {
        this.save();
      }
    },

    prevStep: function() {
      if (!this.isFirstStep()) {
        this.currentStep -= 1;
        this.renderCurrentStep();
      }
    },

    isFirstStep: function() {
      return (this.currentStep === 0);
    },

    isLastStep: function() {
      return (this.currentStep == this.steps.length - 1);
    },

    save: function(){
      console.log('sending form');
      // TODO
    }

  });
});