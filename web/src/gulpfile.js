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
  gulp.watch('src/js/main.js', ['js']);
  gulp.watch('src/scss/*.scss', ['sass']).on('change', () => reload());
  gulp.watch('src/img/*', ['img']).on('change', () => reload());

  gulp.watch('*.js').on('change', () => reload());
  gulp.watch('modules/*.js').on('change', () => reload());
});

gulp.task('js', function(done) {
  gulp.src('js/main.js',{read:false})
  .pipe(parcel({outDir: '../dist/public/js', sourceMaps: true, minify: false}, {source: 'build'})); // dev
  // .pipe(parcel({outDir: '../dist/public/js'}, {source: 'build'})); // prod
});

gulp.task('sass', function (done) {
  return gulp.src('scss/*.scss')
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
    .pipe(gulp.dest('../dist/public/css'));
});

gulp.task('img', function (done) {
    return gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('../dist/public/images'));
});

gulp.task('sync', function() {
  browserSync.init({
      proxy: "http://localhost:8080"
  });
});