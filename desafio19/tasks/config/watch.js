module.exports = function (grunt) {
  grunt.config.set("watch", {
    assets: {
      // Assets to watch:
      files: ["assets/**/*", "tasks/pipeline.js", "!**/node_modules/**"],

      // When assets are changed:
      tasks: ["syncAssets", "linkAssets"],
    },
  });
};
