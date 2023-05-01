module.exports = function (grunt) {
  grunt.config.set("uglify", {
    dist: {
      src: [".tmp/public/concat/production.js"],
      dest: ".tmp/public/min/production.min.js",
    },
    options: {
      mangle: {
        reserved: [
          "AsyncFunction",
          "SailsSocket",
          "Promise",
          "File",
          "FileList",
          "FormData",
          "Location",
          "RttcRefPlaceholder",
        ],
        keep_fnames: true, //eslint-disable-line
      },
      compress: {
        keep_fnames: true, //eslint-disable-line
      },
    },
  });
};
