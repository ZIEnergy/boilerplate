var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    less = require('gulp-less'),
    jade = require('gulp-jade'),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    insert = require('gulp-insert');
    imagemin = require('gulp-imagemin'),
    cleanCSS = require('gulp-clean-css'),
    runSequence = require('run-sequence')

gulp.task('default', function () {
    gulp.start('build');
});

gulp.task('build', [
    'fonts',
    'images',
    'scripts:copy',
    'scripts',
    'templates',
    'styles'
]);

gulp.task('images', function() {
  gulp.src(['./src/images/*','./src/images/**/*','./src/blocks/**/images/*'])
    .pipe(rename({dirname: ''}))
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 7
    }))
    .pipe(gulp.dest('./build/img'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('templates', function () {
  var params = {};
  gulp.src('./src/pages/*.jade')
    .pipe(jade({
      locals: params
    }))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('fonts', function () {
  gulp.src('./src/fonts/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest('./build/fonts'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('scripts:copy', function () {
  gulp.src('./src/scripts/*.js')
    .pipe(gulp.dest('./build/js'));
});

gulp.task('scripts', function () {
  gulp.src('./src/blocks/**/*.js')
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(insert.wrap('$(document).ready(function(){', '})'))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "build"
        },
      reloadOnRestart: true
    });
});

gulp.task('styles', function () {
  gulp.src('./src/styles/style.less')
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 20 versions']
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function () {
    gulp.watch(['./src/styles/*.less', './src/styles/global/*.less', './src/blocks/**/*.less', './src/styles/plugins/*.less'], ['styles']);
    gulp.watch(['./src/pages/*.jade','./src/templates/*.jade','./src/blocks/**/*.jade'], ['templates']);
    gulp.watch(['./src/images/*','./src/blocks/**/images/*'] ['images']);
    gulp.watch('./src/blocks/**/*.js' ['scripts']);
});

gulp.task('dev', ['server', 'build', 'watch']);