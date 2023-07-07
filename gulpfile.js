const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');

// Очищення папки dist
gulp.task('clean', function () {
    return gulp.src('dist', { allowEmpty: true })
      .pipe(clean());
  });

  // Компіляція SCSS у CSS
  gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({ overrideBrowserslist: ['last 2 versions'] }))
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
  });
  

  // Мініфікація та конкатенація JS файлів
gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
      .pipe(concat('scripts.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.stream());
  });
  
  // Оптимізація зображень
  gulp.task('imagemin', function () {
    return gulp.src('src/img/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/img'));
  });
  

  // Стеження за змінами та перезавантаження браузера
gulp.task('serve', function () {
    browserSync.init({
      server: {
        baseDir: './'
      }
    });

    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('src/js/**/*.js', gulp.series('js'));
    gulp.watch('src/img/**/*', gulp.series('imagemin'));
    gulp.watch('*.html').on('change', browserSync.reload);
  });

  // Завдання збірки проекту
gulp.task('build', gulp.series('clean', 'sass', 'js', 'imagemin'));

// Завдання розробки
gulp.task('dev', gulp.series('build', 'serve'));