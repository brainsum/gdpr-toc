const gulp = require('gulp');
const path = require('path');
const exec = require('child_process').exec;
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const parcel = require('gulp-parcel');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
 

gulp.task('default', ['sync'], function() {
  gulp.watch('web/src/js/main.js', ['js']);
  gulp.watch('web/src/scss/*.scss', ['sass']).on('change', () => reload());
  gulp.watch('web/src/img/*', ['img']).on('change', () => reload());

  gulp.watch(['web/dist/index.php', 'web/dist/inc/**/*']).on('change', () => reload());
});

gulp.task('js', function() {
  exec('parcel build web/src/js/main.js --out-dir web/dist/public/js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    reload();
  });
}); 

gulp.task('sass', function (done) {
  return gulp.src('web/src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({
      compatibility: 'ie11',
      level: {
        1: {
          specialComments: 'none'
        }
      }
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('web/dist/public/css'));
});

gulp.task('img', function (done) {
    return gulp.src('web/src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('web/dist/public/img'));
});

gulp.task('sync', function() {
  browserSync.init({
      proxy: "http://gdpr-toc.localhost/"
  });
});