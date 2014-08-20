require.config({
  waitSeconds: 0,
  baseUrl: 'js',
  paths: {
    // Libraries
    jquery      : "public/libs/vendors/jquery/jquery",
    backbone    : 'public/libs/vendors/backbone-1.1.2/backbone',
    handlebars  : "public/libs/vendors/handlebars/handlebars",
    underscore  : "public/libs/vendors/underscore/underscore",
    jade        : 'public/libs/vendors/jade/runtime',
    bootstrap_3 : 'public/libs/vendors/bootstrap-3/bootstrap',
    d3          : 'public/libs/vendors/d3/d3'

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
