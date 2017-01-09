var gulp = require('gulp'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    less = require('gulp-less'),
    pug = require('gulp-pug'),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    insert = require('gulp-insert'),
    runSequence = require('run-sequence'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    plumber = require('gulp-plumber');

gulp.task('default', function () {
    gulp.start('build');
});

gulp.task('build', [
    'fonts',
    'images',
    'scripts:jquery',
    'scripts:plugins',
    'scripts',
    'templates',
    'styles'
]);

gulp.task('clean', function () {
  return del([
    'build/*',
  ]);
});

gulp.task('images', function() {
  gulp.src(['./src/images/*','./src/images/**/*','./src/blocks/**/images/*'])
    .pipe(plumber())
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('./build/img'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('templates', function () {
  var params = {};
  gulp.src('./src/pages/*.pug')
    .pipe(plumber())
    .pipe(pug({
      locals: params,
      pretty: true
    }))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('fonts', function () {
  gulp.src('./src/fonts/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('./build/fonts'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('scripts:jquery', function () {
  gulp.src('./src/scripts/jquery.min.js')
    .pipe(plumber())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('scripts:plugins', function () {
  gulp.src('./src/scripts/plugins/*.js')
    .pipe(plumber())
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('scripts', function () {
  gulp.src(['./src/blocks/**/*.js', './src/scripts/script.js'])
    .pipe(plumber())
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
      reloadOnRestart: true,
      open: false
    });
});

gulp.task('styles', function () {
  gulp.src('./src/styles/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 20 versions']
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function () {
    watch(['./src/styles/*.less', './src/styles/global/*.less', './src/blocks/**/*.less', './src/styles/plugins/*.less'], batch(function (events, done) {
        gulp.start('styles', done);
    }));
    watch(['./src/pages/*.pug','./src/templates/*.pug','./src/blocks/**/*.pug'], batch(function (events, done) {
        gulp.start('templates', done);
    }));
    watch(['./src/images/*','./src/blocks/**/images/*'], batch(function (events, done) {
        gulp.start('images', done);
    }));
    watch(['./src/blocks/**/*.js', './src/scripts/*.js'], batch(function (events, done) {
        gulp.start('scripts', done);
    }));
    watch('./src/fonts/*', batch(function (events, done) {
        gulp.start('fonts', done);
    }));
    watch('./src/scripts/plugins/*.js', batch(function (events, done) {
        gulp.start('scripts:plugins', done);
    }));
});

gulp.task('dev', ['build', 'server', 'watch']);