module.exports = function (grunt) {
  grunt.config.set("hash", {
    options: {
      mapping: "",
      srcBasePath: "",
      destBasePath: "",
      flatten: false,
      hashLength: 8,
      hashFunction: function (source, encoding) {
        if (!source || !encoding) {
          throw new Error(
            "Consistency violation: Cannot compute unique hash for production .css/.js cache-busting suffix, because `source` and/or `encoding` are falsey-- but they should be truthy strings!  Here they are, respectively:\nsource: " +
              require("util").inspect(source, { depth: null }) +
              "\nencoding: " +
              require("util").inspect(encoding, { depth: null })
          );
        }
        return require("crypto")
          .createHash("sha1")
          .update(source, encoding)
          .digest("hex");
      },
    },
    js: {
      src: ".tmp/public/min/*.js",
      dest: ".tmp/public/hash/",
    },
    css: {
      src: ".tmp/public/min/*.css",
      dest: ".tmp/public/hash/",
    },
  });
};
