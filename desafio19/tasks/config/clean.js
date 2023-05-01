module.exports = function (grunt) {
  grunt.config.set("clean", {
    dev: [".tmp/public/**"],
    build: ["www"],
    afterBuildProd: [
      "www/concat",
      "www/min",
      "www/hash",
      "www/js",
      "www/styles",
      "www/templates",
      "www/dependencies",
    ],
  });
};
