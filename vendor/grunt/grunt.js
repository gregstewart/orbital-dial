module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', '../../src/js/Knob.js']
    },
    jshint: {
      options: {
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    min: {
      dist: {
        src: '../../src/js/Knob.js',
        dest: '../../dist/knob.min.js'
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint min');

};