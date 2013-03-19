var testacular = require('testacular');

/*global module:false*/
module.exports = function (grunt) {
  // load all grunt task
  require('matchdep').filterDev('grunt-*').concat(['gruntacular']).forEach(grunt.loadNpmTasks);

  var uiConfig = {
    builddir: 'build',
  };

  // Project configuration.
  grunt.initConfig({
    uiConfig: uiConfig,
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/**\n' + ' * <%= pkg.description %>\n' +
      ' * @version v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * @link <%= pkg.homepage %>\n' +
      ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' + ' */'
    },
    concat: {
      build: {
        src: ['<banner:meta.banner>', 'common/*.js', 'modules/*/*/*.js'],
        dest: '<%= uiConfig.builddir %>/<%= pkg.name %>.js'
      },
      ieshiv: {
        src: ['<banner:meta.banner>', 'common/ieshiv/*.js'],
        dest: '<%= uiConfig.builddir %>/<%= pkg.name %>-ieshiv.js'
      }
    },
    min: {
      build: {
        src: ['<banner:meta.banner>', '<config:concat.build.dest>'],
        dest: '<%= uiConfig.builddir %>/<%= pkg.name %>.min.js'
      },
      ieshiv: {
        src: ['<banner:meta.banner>', '<config:concat.ieshiv.dest>'],
        dest: '<%= uiConfig.builddir %>/<%= pkg.name %>-ieshiv.min.js'
      }
    },
    recess: {
      build: {
        src: ['common/**/*.less'],
        dest: '<%= uiConfig.builddir %>/<%= pkg.name %>.css',
        options: {
          compile: true
        }
      },
      min: {
        src: '<config:recess.build.dest>',
        dest: '<%= uiConfig.builddir %>/<%= pkg.name %>.min.css',
        options: {
          compress: true
        }
      }
    },
    lint: {
      files: ['grunt.js', 'common/**/*.js', 'modules/**/*.js']
    },
    watch: {
      files: ['modules/**/*.js', 'common/**/*.js', 'templates/**/*.js'],
      tasks: 'build test'
    }
  });

  grunt.registerTask('test', [
    'clean:server'
    , 'compass'
    , 'connect:test'
    , 'testacular'
  ]);

  grunt.registerTask('build', [
    // 'test',
    'concat',
    // 'ngmin',
    //'uglify',
    // 'rev:src',
    // 'copy',
    // 'cdnify',
    // 'usemin',
    // 'string-replace'
  ]);

  grunt.registerTask('default', ['build']);
};
