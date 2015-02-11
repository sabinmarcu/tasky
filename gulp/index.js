gulp = require("gulp");

module.exports = function(tasks) {
    tasks.forEach(function(name){
        require('./tasks/' + name)(gulp, function(fn) {gulp.task(name, fn);});
    });

    return gulp;
};