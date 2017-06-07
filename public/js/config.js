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
    bootstrap   : '../libs/vendors/bootstrap/bootstrap',
    d3          : '../libs/vendors/d3/d3',
    wiz         : 'common/backbone-wizard',
    // wiz         : '../backbone-wizard.min',
    ui          : '../libs/vendors/jqueryui/jquery-ui'

  },

  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      deps:["jquery"],
      exports: '_'
    },
    backbone: {
      deps:["jquery",'underscore'],
      exports: 'Backbone'
    },
    handlebars: {
      deps: ['backbone'],
      exports: 'Handlebars'
    },
    bootstrap:{
      deps: ['jquery']
    },
    ui:{
      deps:['jquery']
    },
    wiz:{
      deps:['underscore', 'backbone', 'd3']
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
