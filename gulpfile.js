var source = require('vinyl-source-stream')
var browserify = require('browserify')
var gulp = require('gulp');
var watchify = require('watchify');
var gutil = require('gulp-util');

gulp.task('examples', function() {
  var stream = browserify("./examples/bunch_of_balls/main.js")
                .transform("babelify", {presets: ["es2015"]})
                .bundle();

  return stream
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./examples/bunch_of_balls'));
});

var stream = watchify(browserify("./examples/bunch_of_balls/main.js")
                .transform("babelify", {presets: ["es2015"]}));
gulp.task('watch', bundle);
stream.on('update', bundle); // on any dep update, runs the bundler
stream.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return stream
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./examples/bunch_of_balls'));
}

gulp.task('default',['examples']);