module.exports = function (grunt) {
  grunt.config.set("cssmin", {
    dist: {
      src: [".tmp/public/concat/production.css"],
      dest: ".tmp/public/min/production.min.css",
    },
  });
};
