module.exports = function (grunt) {
  grunt.registerTask("default", [
    // 'polyfill:dev', //« uncomment to ALSO transpile during development (for broader browser compat.)
    "compileAssets",
    // 'babel',        //« uncomment to ALSO transpile during development (for broader browser compat.)
    "linkAssets",
    "watch",
  ]);
};
