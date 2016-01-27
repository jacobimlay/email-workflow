var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var inlinesource = require('gulp-inline-source');
var minifyHTML = require('gulp-minify-html');
var inlineCss = require('gulp-inline-css');

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('sass', function() {
  return gulp.src("./scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./css/"))
    .pipe(browserSync.stream());
});

gulp.task('inline-css', ['sass'], function() {
  return gulp.src('./*.html')
    .pipe(inlinesource())
    .pipe(inlineCss({
      applyStyleTags: true,
      applyLinkTags: true,
      preserveMediaQueries: true
    }))
    .pipe(gulp.dest('./build/'));
});
 
gulp.task('minify-html', ['sass', 'inline-css'], function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
  return gulp.src('./build/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
  gulp.watch("./scss/*.scss", ['sass', 'inline-css', 'minify-html']);
  gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'sass', 'inline-css', 'minify-html', 'watch']);