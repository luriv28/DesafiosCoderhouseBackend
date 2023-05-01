module.exports = function (grunt) {
  grunt.registerTask("prod", [
    "polyfill:prod", //« Remove this to skip transpilation in production (not recommended)
    "compileAssets",
    "babel", //« Remove this to skip transpilation in production (not recommended)
    "concat",
    "uglify",
    "cssmin",
    "sails-linker:prodJs",
    "sails-linker:prodStyles",
  ]);
};
