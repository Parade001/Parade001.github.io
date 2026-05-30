const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const htmlclean = require('gulp-htmlclean');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');

// 压缩 HTML
gulp.task('minify-html', function() {
  return gulp.src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(htmlmin({
      removeComments: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }))
    .pipe(gulp.dest('./public'));
});

// 压缩 CSS
gulp.task('minify-css', function() {
  return gulp.src('./public/**/*.css')
    .pipe(minifyCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('./public'));
});

// 压缩 JS
gulp.task('minify-js', function() {
  return gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
    .pipe(uglify())
    .pipe(gulp.dest('./public'));
});

// 压缩图片
gulp.task('minify-images', function() {
  return gulp.src('./public/medias/**/*.{jpg,jpeg,png,gif,svg}')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 80, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('./public/medias'));
});

// 默认任务
gulp.task('default', gulp.parallel(
  'minify-html',
  'minify-css',
  'minify-js',
  'minify-images'
));
