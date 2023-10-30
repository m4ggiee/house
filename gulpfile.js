import * as sassLibrary from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(sassLibrary);
import gulp from 'gulp';
import concat from 'gulp-concat';
import minify from 'gulp-uglify';
import eslint from 'gulp-eslint';

const compileSass = () => {
  return gulp.src('sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'));
};

const watchSass = () => {
  gulp.watch('sass/*.scss', compileSass);
};

const minifyAndConcatJs = () => {
  return gulp.src('src/js/*.js')
    .pipe(concat('bundle.js'))
    .pipe(minify())
    .pipe(gulp.dest('dist/js'));
};

const lintCode = () => {
  return gulp.src('src/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
};

const watchJs = () => {
  gulp.watch('src/js/*.js', gulp.series(lintCode, minifyAndConcatJs));
};

gulp.task('sass', compileSass);
gulp.task('watch-sass', watchSass);
gulp.task('default', gulp.series('sass', 'watch-sass'));
gulp.task('js', minifyAndConcatJs);
gulp.task('lint', lintCode);
gulp.task('watch-js', watchJs);
