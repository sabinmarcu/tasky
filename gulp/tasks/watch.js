// var watch = require("gulp-watch");

module.exports = function(gulp, attach) {
    attach(function() {
        gulp.watch("src/**/*", ["build"]);
    });
};