var source = require('vinyl-source-stream');
var browserify = require('browserify');
var gulp = require('gulp');
var watchify = require('watchify');
var gutil = require('gulp-util');
var minimist = require('minimist');

var options = minimist(process.argv.slice(2), {
  default: { 
    watch: false
  }
});

gulp.task('bunch_of_balls', browserifyTask(
  "./examples/bunch_of_balls/main.js", 
  "./examples/bunch_of_balls", 
  "bundle.js"
));
gulp.task('colliding_balls', browserifyTask(
  "./examples/colliding_balls/main.js", 
  "./examples/colliding_balls", 
  "bundle.js"
));

gulp.task('examples', ['bunch_of_balls', 'colliding_balls']);
gulp.task('default', ['examples']);

function browserifyTask(src, output, name) {
  return function() {
    name = name || "bundle.js";
    var b = browserify(src)
      .transform("babelify", {presets: ["es2015"]});

    if (options.watch) b = watchify(b);

    function bundle() {
      return b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(name))
        .pipe(gulp.dest(output));
    }

    if (options.watch) {
      b.on('update', bundle);
      b.on('log', gutil.log);
      return bundle();
    } else {
      return bundle();
    }
  }
}