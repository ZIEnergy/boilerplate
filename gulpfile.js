var gulp = require('gulp'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    less = require('gulp-less'),
    pug = require('gulp-pug'),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    insert = require('gulp-insert'),
    runSequence = require('run-sequence')

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
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('./build/img'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('templates', function () {
  var params = {};
  gulp.src('./src/pages/*.pug')
    .pipe(pug({
      locals: params,
      pretty: true
    }))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('fonts', function () {
  gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./build/fonts'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('scripts:jquery', function () {
  gulp.src('./src/scripts/jquery.min.js')
    .pipe(gulp.dest('./build/js'));
});

gulp.task('scripts:plugins', function () {
  gulp.src('./src/scripts/plugins/*.js')
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('scripts', function () {
  gulp.src(['./src/blocks/**/*.js', './src/scripts/script.js'])
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
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 20 versions']
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function () {
    gulp.watch(['./src/styles/*.less', './src/styles/global/*.less', './src/blocks/**/*.less', './src/styles/plugins/*.less'], ['styles']); gulp.watch(['./src/pages/*.pug','./src/templates/*.pug','./src/blocks/**/*.pug'], ['templates']);
    gulp.watch(['./src/images/*','./src/blocks/**/images/*'], ['images']);
    gulp.watch(['./src/blocks/**/*.js', './src/scripts/*.js'], ['scripts']);
});

gulp.task('dev', [ 'clean', 'build', 'server', 'watch']);