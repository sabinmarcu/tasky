var browserify = require("browserify"),
    reactify = require("reactify"),
    lessify = require("node-lessify"),
    plumber = require("gulp-plumber"),
    notify = require("gulp-notify"),
    livereload = require("gulp-livereload"),
    source = require("vinyl-source-stream");

module.exports = function(gulp, attach) {
    gulp.task("build-deps", function() {
        browserify({debug: true})
            .transform(lessify)
            .transform(reactify)
            .add('./src/deps.js')
            .bundle()
            .on('error', require("../utils/notify"))
            // .on('error', function() {debugger;} )
            .pipe(source("deps.js"))
            .pipe(gulp.dest('./public'));
    });
    attach(function() {
        browserify({debug: true})
            .transform(lessify)
            .transform(reactify)
            .add('./src/index.js')
            .bundle()
            .on('error', require("../utils/notify"))
            .pipe(source("browser.js"))
            .pipe(gulp.dest('./public'))
            .pipe(livereload());
    });
};
