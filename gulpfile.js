'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect-php');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var open = require('gulp-open');
var sass = require('gulp-sass');
var fs = require('fs');
var walk = require('walk');
var marked = require('marked');
var injectHTML = require('gulp-inject-element');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var serveStatic = require('serve-static')
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var ngAnnotate = require('gulp-ng-annotate');
var htmlreplace = require('gulp-html-replace');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-clean');
var concatCss = require('gulp-concat-css');
var runSequence = require('run-sequence');
var htmlmin = require('gulp-htmlmin');
var ffmpeg = require('gulp-fluent-ffmpeg');
var replace = require('gulp-replace');

var epicConfig = {
    path : 'app',
    main: 'app/index.html'
}
/* DEV TASKS */
var serve = serveStatic('/bower_components');

gulp.task('connect-sync', function() {
    connect.server({
        port: 8001,
        hostname: "localhost",
        base: "./app"
    });
    browserSync.init({
        proxy: "localhost:8001",
        files: './app',
        watchOptions: {
            ignoreInitial: true,
            ignored: '*.scss'
        },
        serveStatic: ['./bower_components'],
        host: 'localhost',
        rewriteRules: [
            {
                match: /bower_components/g,
                fn: function (req, res, match) {
                    return '';
                }
            }
        ]
    })
 
    gulp.watch('**/*.php').on('change', function () {
        browserSync.reload();
    });
});

gulp.task('wiredep', function(){
    gulp.src('./app/index.html')
    .pipe(wiredep({

    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('injectAngular', function () {
    return gulp.src('./app/index.html')
        .pipe(inject(gulp.src('./app/js/**/*.js', {read: false}), {relative: true}))
        .pipe(gulp.dest('./app'));
});

gulp.task('renderMD', function(){
    var walker = walk.walk('./app/md/');
    walker.on('file', function(root, fileStats, next){
        var fileName = fileStats.name.replace('.md', '');
        var renderStats = {
            path: './app/statics/',
            md_path: root + fileStats.name
        };
        fs.readFile(renderStats.md_path, 'utf8', function(err, data){
            if(err){
                console.error('ERROR: ', err);
            };
            var markedHtml = marked(data);
            gulp.src(epicConfig.path + '/templates/statics.html')
            .pipe(injectHTML({
                uses: 'dom',
                find: ['#staticContent'],
                injectStrings: [markedHtml]
            }))
            .pipe(rename(fileName + '.html'))
            .pipe(gulp.dest(renderStats.path));
        });
        next();
    })
});

gulp.task('sass', function () {
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./app/sass/**/*.scss', ['sass']);
});

gulp.task('serve', [ 'wiredep', 'injectAngular', 'sass', 'sass:watch', 'connect-sync']);

/* PRODUCITON TASKS */
/*  Prepare tasks */

gulp.task('clean', function(){
    return gulp.src(['./tmp', './dist'], {read: false})
        .pipe(clean({force: true}));
});


gulp.task('prepare', ['clean', 'renderMD'], function(){
    gulp.src(mainBowerFiles(), { base: './bower_components' })
        .pipe(gulp.dest('./tmp/vendor/'));
    return gulp.src([
        './app/**/*.html',
        './app/statics/**/*', 
        './app/images/**/*', 
        './app/fonts/**/*',
        './app/sounds/**/*',
        './app/callback.php',
        './app/config.php',
        './app/composer.json'
    ], 
    {base: './app'})
        .pipe(gulp.dest('./tmp'));
});

/* JS Tasks */
gulp.task('combine_vendor_js', function(){
    return gulp.src('./tmp/vendor/**/*.js')
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('./tmp/js/'))
});

gulp.task('combine_app_js', function(){
    return gulp.src('./app/js/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./tmp/js/'))
});

gulp.task('js', ['combine_vendor_js', 'combine_app_js'], function(){
    return gulp.src('./tmp/js/**/*')
        .pipe(ngAnnotate())
        .pipe(uglify({
            source_map: true
        }))
        .pipe(gulp.dest('./dist/js'))
});

/* Image Tasks */
gulp.task('images', function(){
    return  gulp.src('./tmp/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
});

/* CSS Tasks */
gulp.task('concat_vendor_css', function(){
    return gulp.src('./tmp/vendor/**/*.css')
        .pipe(concatCss('vendor.min.css'))
        .pipe(gulp.dest('./tmp/css/'));
});

gulp.task('concat_css', function(){
    return gulp.src('./app/css/**/*.css')
        .pipe(concatCss('app.min.css'))
        .pipe(gulp.dest('./tmp/css/'))
});

gulp.task('minify_css', function(){
    return gulp.src('./tmp/css/**/*.css')
        .pipe(cleanCSS({compatibility: 'ie8', keepSpecialComments: 0}))
        .pipe(gulp.dest('./dist/css'));
})

gulp.task('css', ['sass'], function(cb){
    runSequence('concat_vendor_css', 'concat_css', 'minify_css', cb);
});

/* Replace Tasks */

gulp.task('replace', function(){
    return  gulp.src('./tmp/index.html')
    .pipe(htmlreplace({
        'css_vendor': '/css/vendor.min.css',
        'css': '/css/app.min.css',
        'js_vendor': '/js/vendor.min.js',
        'js': '/js/app.min.js'
    }))
    .pipe(gulp.dest('./tmp/'));
});

/* HTML Tasks */
gulp.task('html', ['replace'], function() {
  return gulp.src('./tmp/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
});

gulp.task('convert', function(){
    return gulp.src('./tmp/sounds/*.wav')
        .pipe(ffmpeg('mp3', function (cmd) {
          return cmd
            .audioBitrate('128k')
            .audioChannels(2)
            .audioCodec('libmp3lame')
        }))
        .pipe(gulp.dest('./dist/sounds'));
});

gulp.task('mp3', ['convert'], function(){
    return gulp.src(['./dist/js/app.min.js'])
        .pipe(replace('.wav', '.mp3'))
        .pipe(gulp.dest('./dist/js/'));
});


gulp.task('copy', function(){
    return gulp.src([
        './tmp/fonts/**/*',
        './tmp/callback.php', 
        './tmp/composer.json'],
        {base: './tmp'})
        .pipe(gulp.dest('./dist'));
});

gulp.task('release', ['prepare'], function(cb){
    runSequence(['js', 'css', 'images', 'html', 'mp3', 'copy'], cb);
})