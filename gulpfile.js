'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');


// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'bower', 'inject', 'bowerFiles'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/**/*.scss", ['sass']);
    gulp.watch("app/**/*.html").on('change', browserSync.reload);
    gulp.watch("js/**/*.js", ['inject','js-watch']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({}))
    .pipe(gulp.dest('./app'));
});

gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('inject', function () {
  var target = gulp.src('./app/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['js/**/*.js', 'css/**/*.css'], {read: false,  cwd: __dirname + '/app'});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./app'));
});


gulp.task('default', ['serve']);

gulp.task('bowerFiles', function() {
    return gulp.src(mainBowerFiles(),{ base: './bower_components' })
        .pipe(gulp.dest('./app/bower_components/'))
});