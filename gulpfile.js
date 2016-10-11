var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    less = require('gulp-less'),
    jade = require('gulp-jade'),
    imagemin = require('gulp-imagemin'),
    cleanCSS = require('gulp-clean-css'),
    runSequence = require('run-sequence')

gulp.task('default', function () {
    gulp.start('build');
});

gulp.task('build', [
    'fonts',
    'images',
    'scripts',
    'templates',
    'styles'
]);

gulp.task('images', function() {
  gulp.src(['./src/images/*','./src/images/**/*'])
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
      locals: params,
      pretty: true
    }))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('fonts', function () {
  gulp.src('./src/fonts/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest('./build/fonts'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "build"
        },
      tunnel: 'zienergy',
      reloadOnRestart: true,
    });
});

gulp.task('scripts', function () {
  gulp.src('./src/scripts/*.js')
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.reload({stream:true}));
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
    gulp.watch(['./src/styles/*.less', './src/styles/global/*.less', './src/styles/blocks/*.less', './src/styles/plugins/*.less'], ['styles']);
    gulp.watch('./src/pages/*.jade', ['templates']);
    gulp.watch('./src/templates/*.jade', ['templates']);
    gulp.watch('./src/images/*', ['images']);
    gulp.watch('./src/scripts/*.js', ['scripts']);
});

gulp.task('dev', ['server', 'build', 'watch']);