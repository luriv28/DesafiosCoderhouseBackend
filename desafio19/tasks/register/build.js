module.exports = function (grunt) {
  grunt.registerTask("build", [
    // 'polyfill:dev', //« uncomment to ALSO transpile during development (for broader browser compat.)
    "compileAssets",
    // 'babel',        //« uncomment to ALSO transpile during development (for broader browser compat.)
    "linkAssetsBuild",
    "clean:build",
    "copy:build",
  ]);
};
