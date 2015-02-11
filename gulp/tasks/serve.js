var serve = require("gulp-serve");

module.exports = function(gulp, attach) {
    attach(serve({root: ["public"], port: (process.env.PORT || 3000)}));
};