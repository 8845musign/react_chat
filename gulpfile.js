var source      = require('vinyl-source-stream');
var gulp        = require('gulp');
var gutil       = require('gulp-util');
var browserify  = require('browserify');
var babelify    = require('babelify');
var watchify    = require('watchify');
var notify      = require("gulp-notify");

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file, watch) {
  var props = {
    entries:  ['client/js/index.js'],
    debug:    true,
    plugin:   [],
    verbose:  true
  };

  if (watch) {
    props.cache         = {};
    props.packageCache  = {};
    props.plugin.push(watchify);
  }

  var bundler = browserify(props);
  bundler.transform(babelify, { presets: ["es2015", "react"] });
  function rebundle() {
    var stream = bundler.bundle();
    return stream.on('error', handleErrors)
    .pipe(source(file))
    .pipe(gulp.dest('public/js'));
  }
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });
  return rebundle();
}

gulp.task('build', function() {
  return buildScript('index.js', false);
});

gulp.task('default', ['build'], function() {
  return buildScript('index.js', true);
});
