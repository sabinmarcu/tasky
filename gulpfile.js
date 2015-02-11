(function() {
    "use strict";
    var gulp = require("./gulp")(["browserify", "serve", "watch"]);

    gulp.task("build", ["browserify"]);
    gulp.task("default", ["build-deps", "build", "watch", "serve"]);
    gulp.task("noserve", ["build-deps", "build", "watch"]);

    module.exports = gulp;
})();