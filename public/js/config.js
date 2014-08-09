require.config({
  //urlArgs: "bust=${project.version}",
  waitSeconds: 0,
  baseUrl: 'js',
  paths: {
    // Libraries
    jquery      : "../libs/vendors/jquery/jquery",
    backbone    : '../libs/vendors/backbone-1.1.2/backbone',
    handlebars  : "../libs/vendors/handlebars/handlebars",
    underscore  : "../libs/vendors/underscore/underscore",
    jade        : '../libs/vendors/jade/runtime',
    bootstrap_3 : '../libs/vendors/bootstrap-3/bootstrap'

  },


  shim: {
    jquery: {
      exports: '$'
    },
    backbone:{
      deps: ['jquery','underscore'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    },
    handlebars: {
      deps: ['backbone'],
      exports: 'Handlebars'
    },
    bootstrap_3:{
      deps: ['jquery']
    }
  }
});

define(function(require) {
  'use strict';


  var $ = require('jquery')
  , APP = require('app')
  , Backbone = require('backbone')
  , AppRouter = require('apps/router')

  ;

  Backbone.View.prototype.close = function () {
    console.log('Closing view ' + this);
    if (this.beforeClose) {
      this.beforeClose();
    }
    this.remove();
    this.unbind();
  };

  new AppRouter({});

  Backbone.history.start();

});
