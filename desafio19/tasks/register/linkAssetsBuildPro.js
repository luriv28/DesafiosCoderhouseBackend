module.exports = function (grunt) {
  grunt.registerTask("linkAssetsBuildProd", [
    "sails-linker:prodJsBuild",
    "sails-linker:prodStylesBuild",
  ]);
};
