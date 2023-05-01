module.exports = function (grunt) {
  grunt.config.set("copy", {
    dev: {
      files: [
        {
          expand: true,
          cwd: "./assets",
          src: ["**/*.!(coffee|less)"],
          dest: ".tmp/public",
        },
      ],
    },
    build: {
      files: [
        {
          expand: true,
          cwd: ".tmp/public",
          src: ["**/*"],
          dest: "www",
        },
      ],
    },
    beforeLinkBuildProd: {
      files: [
        {
          expand: true,
          cwd: ".tmp/public/hash",
          src: ["**/*"],
          dest: ".tmp/public/dist",
        },
      ],
    },
  });
};
