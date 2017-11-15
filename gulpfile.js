const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile Sass & Inject Into Browser
gulp.task('sass', function () {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'template/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("template/css"))
    .pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task('serve', ['sass'], function () {

  browserSync.init({
    server: "./template"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'template/scss/*.scss'], ['sass']);
  gulp.watch("template/*.html").on('change', browserSync.reload);
});

// Move JS Files of boostrap framework to template/js
gulp.task('js', () => {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest("template/js"))
    .pipe(browserSync.stream());
});

// Move Fonts of boostrap framework to template/fonts
gulp.task('fonts', () => {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('template/fonts'))
})

// Move Font Awesome CSS of boostrap framework to template/css
gulp.task('fa', () => {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('template/css'))
})



gulp.task('default', ['js', 'serve', 'fa', 'fonts']);