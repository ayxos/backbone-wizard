require.config({
  waitSeconds: 0,
  baseUrl: 'public/js',
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

  var Backbone = require('backbone')
  , AppRouter = require('apps/router')
  ;

  new AppRouter({});

  Backbone.history.start();

});
