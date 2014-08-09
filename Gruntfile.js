module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bower: {
      install: {
        options: {
          targetDir: './public/libs/vendors',
          // layout: 'byType',
          install: true,
          verbose: true,
          cleanTargetDir: false,
          cleanBowerDir: false,
          bowerOptions: {}
        }
      }
    },

    clean: {
      pre: {
        src: ['./public/js/main-built.*', './public/js/tpl/*']
      },
      bower: {
        src: ['./public/libs/vendors/*']
      }
    },

    copy: {
      main: {
        expand: true,
        flatten: true,
        src: './public/libs/vendors/requirejs/require.js',
        dest: './public/libs',
        filter: 'isFile'
      }
    },

    // TODO: improve jasmine with helpers

    jade: {
      apps: {
        files: {
          './public/js/tpl/': './public/js/**/**/**/**/*.jade'
        },
        options: {
          basePath: './public/js/',
          wrap: {
            wrap: true,
            amd: true,
            node: false,
            dependencies: 'jade'
          },
          runtime: false
        }
      }
    },

    jasmine : {
      require : {
        src : './public/js/',
        options : {
          specs : './spec/**/*.js',
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: './public/js/config.js'
          }
        }
      }

    },

    jshint: {
      options: {
        bitwise:true,
        // Prohibit bitwise operators (&, |, ^, etc.).
        curly:true,
        // Require {} for every new block or scope.
        eqeqeq:false,
        // SET TO TRUE
        // Require triple equals i.e. `===`.
        immed:true,
        // Require immediate invocations to be wrapped in parens e.g. `( function(){}() );`
        latedef:true,
        // Prohibit variable use before definition.
        newcap:true,
        // Require capitalization of all constructor functions e.g. `new F()`.
        noarg:true,
        // Prohibit use of `arguments.caller` and `arguments.callee`.
        undef:true,
        // Require all non-global variables be declared before they are used.
        unused:true,
        // Warns when you define and never use your variables.
        debug:false,
        // Allow debugger statements e.g. browser breakpoints.
        validthis: true,
        // Allow use of this
        '-W065': true,
        // Avoid radix on Parse()

        // == Environments ====================================================
        browser:true,
        // Standard browser globals e.g. `window`, `document`.
        jquery:true,
        // Enable globals exposed by jQuery JavaScript library.
        devel:true,
        // Allow development statements e.g. `console.log();`.

        // == JSLint Legacy ===================================================

        // onevar:true,
        // Allow only one `var` statement per function.
        strict:false,
        laxcomma: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        node: true,
        // Check identation
        // indent: 2,
        globals: {
          window: true,
          document: true,
          location: true,
          define: true,
          require: true,
          requirejs: true,
          // MUST BE REMOVED
          moment: true,
          //download.js
          download: true,
          // Here places global words that not need tobe defined
          $: true,
          _:true,
        },
      },

      all: [
        './public/js/apps/**/**/*.js',
        './public/js/common/**/**/*.js'
      ]

    },

    processhtml: {
      dev: {
        files: {
          './public/index.htm': ['./resources/index_base.htm']
        }
      },
      prod: {
        files: {
          './public/index.htm': ['./resources/index_base.htm']
        }
      }
    },
    // TODO: improve require with compress

    requirejs: {

      app: {
        options: {
          name:'config',
          baseUrl: './public/js',
          mainConfigFile: "./public/js/config.js",
          out: "./public/js/main-built.js",
          preserveLicenseComments: false,
          inlineText: false,
          findNestedDependencies: true,
          skipModuleInsertion: false,
        }
      }
    },

    sass: {
      dev: {                            // Target
        options: {
          // outputStyle: 'nested'
          outputStyle: 'compressed'
        },
        files: {                         // Dictionary of files
          './public/css/style.min.css': './resources/stylesheets/style.scss'    // 'destination': 'source'
        }
      }
    },

    // WATCH TASK

    watch: {
      options: {
        event: ['added', 'changed']
      },
      jade: {
        files: ['./public/js/**/*.jade'],
        tasks: ['newer:jade']
      },
      test: {
        files: ['./public/js/**/*.js'],
        tasks: ['jasmine']
      },
      style: {
        files: ['./resources/**/*.scss'],
        tasks: ['sass']
      },
      jasmine: {
        files: ['./spec/**/*.js'],
        tasks: ['jasmine']
      }
    }

  });

  // EXTERNAL PLUGINS //

  // Minify and disturb JS files
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // JS Code quality
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // Watcher, execute multiple task when a file has been changed
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Let grunt compile Sass Css preprocessors files
  grunt.loadNpmTasks('grunt-sass');
  // Compile Jade templates to HTML !!!IMPORTANT there is another contrib from jade to HTML
  grunt.loadNpmTasks('grunt-jade');
  // Remove files
  grunt.loadNpmTasks('grunt-contrib-clean');
  // watch newer files
  grunt.loadNpmTasks('grunt-newer');
  // Testing Js code using Jasmine and Phantom
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  // For building the static application
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  // Compress & minify CSS not work on windows IDNK
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  // Load Bower.json
  grunt.loadNpmTasks('grunt-bower-task');
  // Let move files
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Set dist or dev environment
  grunt.loadNpmTasks('grunt-processhtml');



  // TASKS //

  // production task using uglify
  grunt.registerTask('production', ['bower', 'clean:pre', 'sass', 'copy', 'jade', 'processhtml:prod', 'requirejs:app']);

  // default task
  grunt.registerTask('default', ['jshint:all', 'clean:pre', 'copy', 'sass', 'jade', 'processhtml:dev']);
  // test task
  grunt.registerTask('test', ['jshint', 'jasmine']);

};
