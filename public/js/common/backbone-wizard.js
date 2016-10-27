/*!
 * Backbone-wizard v1.4.1 (http://http://ayxos.com/backbone-wizard/)
 * Copyright 2014 Marco Antonio Pajares Silva.
 * Licensed under MIT
 */

define(function(require) {
  'use strict';
  
  var Backbone;

  // if exist requireJs
  if (typeof(require) != 'undefined'){
    if(!require('underscore') || !require('d3') || !require('backbone')){
      console.log('requireJs shim configuration:\npath-to-lib:{\ndeps:["underscore","backbone", "d3"]\n}');
    }
  }

  if(!window._){
    console.log('You need to have underscore previously loaded');
  }
  else{
    _ = window._;
  }
  if(!window.Backbone){
    console.log('You need to have Backbone prevoiusly loaded');
  }
  else{
    Backbone = window.Backbone;
  }
  if(!window.d3){
    console.log('if you want tree, You need to have d3 prevoiusly loaded');
  }


  var template = '<header><div id="progress_indicator"></div><h2 id="step_title"></h2><p id="step_instructions"></p></header><div class="current_step_container"></div><footer><div id="buttons"><button id="prev_step_button" class="btn btn-info">Prev:</button><button id="next_step_button" class="btn btn-info">Next:</button></div></footer>';

  var template_tree = '<header><div id="progress_indicator"></div><h2 id="step_title"></h2><p id="step_instructions"></p></header><div class="current_step_container"></div><footer><div id="buttons"><button id="prev_step_button" class="btn btn-info">Prev:</button><button id="next_step_button" class="btn btn-info">Next:</button></div><button id="showTree" class="btn btn">Tree</button><div class="tree" id="tree"></div></footer>';

  // var json_stack = [];

  var WizardInit = Backbone.View.extend({

    id: 'wizard',

    events: {
      "click #next_step_button"                 : "nextStep",
      "click #prev_step_button"                 : "goToStep",
      "click #progress_indicator > label"       : "goToStep",
      "click #showTree"                         : "showTree"
    },

    initialize: function(arg) {
      _.bindAll(this, 'render');
      console.log('arg',arg);
      this.steps = arg.steps;
      this.currentStep = 0;
      this.tree = arg.tree;
      if(arg.tree.shape){
        this.shape = arg.tree.shape;
      }
      else{
        this.shape = 'circle';
      }
      console.log('tree', this.tree);
      if (this.tree.render === true){
        this.template = template_tree;
      }
      else{
        this.template = template;
      }
    },

    render: function() {
      $(this.el).html(_.template(this.template));

      this.progressIndicator = this.$("#progress_indicator");
      this.title = this.$("h2#step_title");
      this.instructions = this.$("p#step_instructions");
      this.currentStepContainer = this.$(".current_step_container");
      this.nextStepButton = this.$("#next_step_button");
      this.prevStepButton = this.$("#prev_step_button");

      this.renderStep(this.currentStep, true);
      return this;
    },

    renderProgressIndicator: function() {
      this.progressIndicator.empty();
      _.each(this.steps, _.bind(function(step) {
        if(step.step_number <= this.currentStep){
          var el =  '<label data-step="' + step.step_number + '"><span>' + step.step_number + '</span><title>' + step.title + '</title></label>';
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

      this.renderStep(this.currentStep, true);
    },

    renderStep: function(step_number, addToTree) {
      console.log('renderStep', step_number, addToTree, this.steps);
      var currentStep = this.steps[step_number];
      var prevStep;
      if (!this.isFirstStep()){
        prevStep = this.steps[this.currentStep - 1];
      }
      else if(this.tree.render === true && addToTree === true){
        window.jsonTree = [{ 
          "name" : this.steps[this.currentStep].title,
          "parent":"null"
        }];
      }
      var nextStep = this.steps[this.currentStep + 1];

      this.title.html(currentStep.title);
      this.instructions.html(currentStep.instructions);
      this.currentView = new currentStep.view();
      this.currentStepContainer.html(this.currentView.render().el);

      this.renderProgressIndicator();

      if (prevStep) {
        this.prevStepButton.attr('data-step', this.currentStep - 1);
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
      var step = parseInt($(event.currentTarget).attr('data-step'));
      console.log('click stepProgress', step);
      this.prevStep(step);

      this.resetJsonTree();

    },

    resetJsonTree:function(){
      $('svg').remove();
      window.svg = null;
      window.tree = null;
      window.dataMap = null;
      for(var i=0; i < this.currentStep + 1;i++){
        if(i === 0){
          window.jsonTree = [{ 
            "name"    :this.steps[i].title,
            "parent"  :"null"
          }];
        }
        else{
          window.jsonTree.push({ 
            "name"    :this.steps[i].title,
            "parent"  :this.steps[i-1].title,
          });
        }
      }
      this.createTree();
    },

    showTree:function(){
      $('.tree').toggle();
    },

    nextStep: function() {
      if (!this.isLastStep()) {
        this.currentStep += 1;

        // check if jsontree exist as a global var and if the users wanna show tree
        if(window.jsonTree && this.tree.render === true){
          console.log('tree found');
          window.jsonTree.push({ 
            "name" : this.steps[this.currentStep].title,
            "parent": this.steps[this.currentStep - 1].title
          });
          this.update();

          //this.drag();
          
        }

        this.renderStep(this.currentStep, true);
      } else {
        this.save();
      }
    },

    prevStep: function(step) {
      if(!step){
        this.currentStep -= 1;
        console.log('no hay step definido');
      }
      else{
        this.currentStep = parseInt(step);
      }
      if (!this.isFirstStep()) {
        this.renderStep(this.currentStep, false);
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
    },

    createTree:function(){
      console.log('jsontree create', window.jsonTree);
      // *********** Convert flat data into a nice tree ***************
      // create a name: node map

      // ************** Generate the tree diagram  *****************
      var margin = {top: 20, right: 120, bottom: 20, left: 120},
        width = 960 - margin.right - margin.left,
        height = 500 - margin.top - margin.bottom;
        
      window.i = 0;
       
      window.tree = d3.layout.tree()
        .size([height, width]);
       
      window.diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });
       
      window.svg = d3.select(".tree").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
      this.update();
    },

    update: function() {

      // create the tree array
      var treeData = [];

      console.log('jsonTree update', window.jsonTree);

      var aux = window.jsonTree;

      window.dataMap = aux.reduce(function(map, node) {
        map[node.name] = node;
        return map;
      }, {});

      aux.forEach(function(node) {
        // add to parent
        var parent = window.dataMap[node.parent];
        if (parent) {
          // create child array if it doesn't exist
          (parent.children || (parent.children = []))
            // add node to child array
            .push(node);
        } else {
          // parent is null or missing
          treeData.push(node);
        }
      });
     
      // Compute the new tree layout.
      var nodes = window.tree.nodes(treeData[0]).reverse(),
        links = window.tree.links(nodes);
     
      // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * 180; });
     
      // Declare the nodes…
      var node = window.svg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++window.i); });
     
      // Enter the nodes.
      var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { 
          return "translate(" + d.y + "," + d.x + ")"; });

      /* DEFINING TYPES OF SHAPES */
     
      if(this.shape == 'circle'){
        nodeEnter.append("circle")
          .attr("r", 10)
          .style("fill", "#fff")
          .classed({'rect': false, 'circle': true})
          ;
      }
      if(this.shape == 'rect'){
        //Width and height
        var w = 50;
        var h = 20;
        // var barPadding = 1; 
        nodeEnter.append("rect")
         .attr("x", 0)
         .attr("y", 0)
         .attr("width", w)
         .attr("height", h)
         .attr("fill", "teal")
         .classed({'rect': true, 'circle': false})
         ;
      }
     
      nodeEnter.append("text")
        // .attr("font-family", "sans-serif")
        // .attr("font-size", "11px")
        // .attr("fill", "black")
        // .attr("text-anchor", "middle")
        .style("fill-opacity", 1)
        .attr("x", function(d) { 
          return d.children || d._children ? -13 : 13; })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { 
          return d.children || d._children ? "end" : "start"; })
        .text(function(d) { return d.name; })
        .classed({'text': true})
        ;


      /* INTERACTION FUNCTIONS*/

      // drag function
      var transX = 50, transY = 0;
      var theElement = d3.select('svg > g').attr('transform', "translate(" + transX + ", " + transY + ")");

      var addDragging = function (element) {
        element.call(d3.behavior.drag()
          .on('drag', function(data) {
            console.log('dragging', data);
            transX += d3.event.dx;
            transY += d3.event.dy;
            theElement.attr('transform', "translate(" + transX + ", " + transY + ")");
          })
        );
      };

      addDragging(theElement);

      // hover function
      nodeEnter.on('mouseover', function(d){
        console.log('mouseover on', d);
        var nodeSelection = d3.select(this).style({opacity:'0.8'});
        nodeSelection.select("text").style({opacity:'1.0'});
      }).on('mouseout', function(d){
        console.log('mouseout on', d);
        var nodeSelection = d3.select(this).style({opacity:'1'});
        nodeSelection.select("text").style({opacity:'1.0'});
      })

      // click function
      .on('click', function(d){
        console.log('click on', d, d3.select(this));
      })

      ;

     /* END INTERACTION FUNCTIONS */


      // Declare the links…
      var link = window.svg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });
     
      // Enter the links.
      link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", window.diagonal);

      console.log('window.jsonTree end', window.jsonTree);
    }

  });

  return Backbone.View.extend({

    initialize: function(arg) {
      _.bindAll(this, 'render', 'wizardMethod');
      this.steps = this.turnSteps(arg.steps);
      this.tree = arg.tree;
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
          view         :        WizardSteps[i].view
        });
      }
      return this.steps;
    },

    render: function() {
      this.wizardMethod();
      if(this.tree.render === true){
        console.log('tree set to true');
        this.onRenderComplete();
      }
      return this;
    },

    onRenderComplete: function () { 
      // check every 200ms to see if this.el has been injected into the DOM 
      if (!$.contains(document.documentElement, this.el)) { 
        var that = this; 
        setTimeout(function () { 
          that.onRenderComplete(); 
        }, 200); 
        return; 
      }
      this.wizard.createTree();
    },

    addStep:function(step){
      console.log('adding step WBV');
      this.wizard.addStep({
        step_number  :        window.wizard.wizard.currentStep + 1,
        title        :        step.title,
        instructions :        step.intro,
        view         :        step.view
      });
    },

    wizardMethod: function() {
      var steps = this.steps;

      this.wizard = new WizardInit({
        steps : steps,
        tree : this.tree
      });

      console.log('view',this.wizard);

      $(this.el).html(this.wizard.render().el);
    }
  });
});