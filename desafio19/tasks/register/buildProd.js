module.exports = function (grunt) {
  grunt.registerTask("buildProd", [
    "polyfill:prod", //« Remove this to skip transpilation in production (not recommended)
    "compileAssets",
    "babel", //« Remove this to skip transpilation in production (not recommended)
    "concat",
    "uglify",
    "cssmin",
    "hash", //« Cache-busting
    "copy:beforeLinkBuildProd", //« For prettier URLs after cache-busting
    "linkAssetsBuildProd",
    "clean:build",
    "copy:build",
    "clean:afterBuildProd",
  ]);
};
