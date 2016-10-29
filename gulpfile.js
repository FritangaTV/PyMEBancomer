'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/**/*.html").on('change', browserSync.reload);
    gulp.watch("js/**/*.js", ['js-watch']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});


gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});


gulp.task('js')

gulp.task('default', ['serve']);

var mainBowerFiles = require('main-bower-files');

