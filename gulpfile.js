var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var concat = require('gulp-concat');
var fileinclude = require('gulp-file-include');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var beautify = require('gulp-beautify');
// check sourcemaps for working properly
// var sourcemaps = require('gulp-sourcemaps');
// var webp = require('gulp-webp');
// adds <picture> <source> over img tag
// var webpHtml = require('gulp-webp-html');
// var minifyJs = require('gulp-uglify');
// var minifyCss = require('gulp-uglifycss');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

// compiling sass, beautifying it, moving to dist
gulp.task('sass', function() {
  // css/style.scss should include all files
  return gulp.src('src/**/*.scss')
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(beautify.css({indent_size: 2}))
    .pipe(gulp.dest('dist'));
});

// transfer all .js files to dist. Also concat all into main.js
gulp.task('js', function() {
  return gulp.src(['src/**/*.js', '!./src/libs/**'])
    // each individual file
    .pipe(beautify.js({indent_size: 2}))
    .pipe(gulp.dest('dist/'))
    // all in one
    .pipe(concat('js/main.js'))
    .pipe(beautify.js({indent_size: 2}))
    .pipe(gulp.dest('dist'));
});

// compiling html files
gulp.task('html', function() {
  return gulp.src('src/**/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        arr: ['']
      }
    }))
    // .pipe(webpHtml())
    .pipe(beautify.html({indent_size: 2}))
    .pipe(gulp.dest('dist'));
});

// minifying all images, creating .webp version of it (if it's .png, .jpg, .gif), distributing to dist
gulp.task('imagemin', function() {
  return gulp.src('src/img/**')
    .pipe(changed('dist/img'))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});
gulp.task('webp', function() {
  return gulp.src('src/img/**')
    // source is .png, .jpg, .gif, but output should be .webp
    .pipe(changed('dist/img',{extension: '.webp'}))
    .pipe(webp())
    .pipe(gulp.dest('dist/img'));
});
// group task for optimizing images (imagemin + webp)
gulp.task('imgOpt', 
  gulp.parallel(
    'imagemin',
    // 'webp'
  )
);

// adding fonts from font dist
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**')
    .pipe(gulp.dest('dist/fonts'));
});

// adding fonts from font dist
gulp.task('notNpmLibs', function() {
  return gulp.src('src/libs/**')
    .pipe(gulp.dest('dist/libs/'));
});

// adding bootstrap
gulp.task('bootstrap', function() {
  return gulp.src(['node_modules/bootstrap/dist/css/bootstrap-grid.min.css', 'node_modules/bootstrap/dist/css/bootstrap.min.css'])
    .pipe(gulp.dest('dist/libs/bootstrap'));
});

// adding jquery 
gulp.task('jquery', function() {
  return gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('dist/libs/jquery'));
});

// addng swiper
gulp.task('swiper', function() {
  return gulp.src(['node_modules/swiper/swiper-bundle.min.js', 'node_modules/swiper/swiper-bundle.min.css'])
    .pipe(gulp.dest('dist/libs/swiper'));
});

// adding imask.js https://www.npmjs.com/package/imask
gulp.task('imask', function() {
  return gulp.src('node_modules/imask/dist/imask.min.js')
    .pipe(gulp.dest('dist/libs/imask'));
});

// adding fancybox https://www.npmjs.com/package/@fancyapps/fancybox
gulp.task('lightbox', function() {
  return gulp.src('node_modules/@fancyapps/fancybox/dist/*')
    .pipe(gulp.dest('dist/libs/lightbox'));
});

//  adding libs to project
gulp.task('libs',
  gulp.parallel(
    'bootstrap',
    'jquery',
    'swiper',
    'imask',
    'lightbox',
    'notNpmLibs',
    'fonts',
  )
);

gulp.task('watch', function(){
  // deffinately should define browserSync as individual task for this but it works for now
  browserSync.init({
    server: {
      baseDir: 'dist/'
    }
  });
  gulp.watch('dist/**').on('change', browserSync.reload);
  gulp.watch('src/**/*.scss', gulp.series('sass'));
  gulp.watch('src/**/*.html', gulp.series('html'));
  gulp.watch('src/**/*.js', gulp.series('js'));
  gulp.watch('src/img/**', gulp.series('imgOpt'));
});

// build task to just build project. Runs async
gulp.task('build', gulp.parallel(
    'sass',
    'js',
    'html',
    'imgOpt',
    'libs',
));

// default task to build project and watch changes. Runs sync
gulp.task('default', gulp.series('build', 'watch'));