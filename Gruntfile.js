// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
module.exports = function(grunt) {

  grunt.initConfig({

    // The lint task will run the build configuration and the application
    // JavaScript through JSHint and report any errors.  You can change the
    // options for this task, by reading this:
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md
    jslint: {
      files: [
        "omnitureHelper.js",
        "spec/*.js"
      ]
    },

    // The headless Jasmine testing is provided by grunt-jasmine-task. Simply
    // point the configuration to your test directory.
    jasmine: {
      src: ["omnitureHelper.js"],
      options: {
        specs: ["spec/*.spec.js"],
        vendor: ["vendor/*.js"]
      }
    },

  });

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask("test", ["jslint", "jasmine"]);
  grunt.registerTask("release", "jslint");
};