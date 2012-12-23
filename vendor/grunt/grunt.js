module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', '../../src/js/orbital-dial.js', '../../src/js/triangle.js', '../../src/js/point.js']
    },
    jshint: {
      options: {
        browser: true
      },
      globals: {
        jQuery: true,
        $: true,
        Point: true,
        Triangle: true
      }
    },
    min: {
      dist: {
        src: ['../../src/js/orbital-dial.js', '../../src/js/triangle.js', '../../src/js/point.js'],
        dest: '../../dist/orbital-dial.min.js'
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint min');

};